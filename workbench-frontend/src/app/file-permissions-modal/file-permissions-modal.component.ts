import { Component, EventEmitter, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { CookieService } from 'ngx-cookie';
import { FileService } from '../file.service';
import { ToastService } from '../toast.service';

import { DataFile } from '../data-file'


@Component({
  selector: 'file-permissions-modal',
  templateUrl: './file-permissions-modal.component.html',
  styleUrls: ['./file-permissions-modal.component.css'],
  providers: [FileService, ToastService] 
})
export class FilePermissionsModalComponent {

  @Output() updatePermissions: EventEmitter<string> = new EventEmitter<string>();
  modalActions = new EventEmitter<string|MaterializeAction>();
  user_list: string[];
  errorMessage: any;
  datafile: DataFile;
  addSelectedUsers: string[];
  removeSelectedUsers: string[];
  constructor(private fileService: FileService, 
              private toastService: ToastService, 
              private cookieService: CookieService,) {
    this.datafile = new DataFile({
      id: 0,
      path: "",
      display_name: "",
      owner: "",
      allowed_access: [""],
      data_type: 0,
    })
   }

  openModal(datafile: DataFile){ 
    this.datafile = datafile;
    this.fileService.getUserList()
    .subscribe(
      users => {
        var newuserlist = [];
        let index = users.indexOf(datafile.owner);
        if (index > -1) { 
            users.splice(index, 1); //remove owner from list of users
        }
        for(let count=0; count < users.length; count++){
          if(!this.datafile.allowed_access.includes(users[count])){
            newuserlist.push(users[count]);
            //make a userlist of only users without access already.
          }
        }
        this.user_list = newuserlist;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
    this.modalActions.emit({action:"modal", params:['open', { dismissible: true }]});
  }

  closeModal() {
    this.addSelectedUsers = [];
    this.removeSelectedUsers = []; 
    this.modalActions.emit({action:"modal", params:['close']});
  }

  addPermissions(){
    let csrf = this.cookieService.get('csrftoken');
    this.fileService.addFilePermissions(this.addSelectedUsers, this.datafile.id, csrf)
      .subscribe(
        success => {
          for(let user of this.addSelectedUsers){
            let index = this.user_list.indexOf(user);
            if (index > -1) { 
              this.datafile.allowed_access.push(this.user_list[index]);
              this.datafile.allowed_access = this.datafile.allowed_access.slice(); //slice copies the array. we do this to trigger angular update 
              this.user_list.splice(index, 1);
              //After granting a user permission, remove them from the "Add Permissions" selectbox
            }
          }
          this.addSelectedUsers = []; //Reset the select box on success
          this.toastService.toast('Permissions successfully added');
          this.updatePermissions.emit(this.datafile.display_name);
        },
        error => {
          this.errorMessage = <any>error;
          this.toastService.toast('Add permissions failed with error: ' + <string>error);
        }
      );
  }

  removePermissions(){
    let csrf = this.cookieService.get('csrftoken');
    this.fileService.removeFilePermissions(this.removeSelectedUsers, this.datafile.id, csrf)
      .subscribe(
        success => {
          for(let user of this.removeSelectedUsers){
            let index = this.datafile.allowed_access.indexOf(user);
            if (index > -1) { 
              //add the removed user to the pool of users that can be given permission
              this.user_list.push(this.datafile.allowed_access[index]);
              this.user_list = this.user_list.slice(); //slice copies the array. we do this to trigger angular update 
              this.datafile.allowed_access.splice(index, 1);
              //After removing a user's permissions, remove them from the "remove permissions" selectbox
            }
          }

          this.removeSelectedUsers = []; //Reset the select box on success
          this.toastService.toast('Permissions successfully removed'); //Toast for the user so they know it worked
          this.updatePermissions.emit(this.datafile.display_name);
        },
        error => {
          this.errorMessage = <any>error;
          this.toastService.toast('Permissions removal failed with error: ' + <string>error);
        }
      );
  }
}
