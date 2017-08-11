import { Component, EventEmitter, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { CookieService } from 'ngx-cookie';

import { FileService } from '../file.service'
import { ToastService } from '../toast.service'
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
  constructor(private fileService: FileService, private toastService: ToastService, private cookieService: CookieService,) {
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
    this.fileService.getUserList()
    .subscribe(
      users => {
        let index = users.indexOf(datafile.owner);
        if (index > -1) { 
            users.splice(index, 1); //remove owner from list of users
        }
        this.user_list = users;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
    this.datafile = datafile;
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  addPermissions(){
    let csrf = this.cookieService.get('csrftoken');
    this.fileService.addFilePermissions(this.addSelectedUsers, this.datafile.id, csrf)
      .subscribe(
        success => {
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
          this.toastService.toast('Permissions successfully removed');
          this.updatePermissions.emit(this.datafile.display_name);
        },
        error => {
          this.errorMessage = <any>error;
          this.toastService.toast('Permissions removal failed with error: ' + <string>error);
        }
      );
  }
}
