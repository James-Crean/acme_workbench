import { Component, EventEmitter, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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

  modalActions = new EventEmitter<string|MaterializeAction>();
  user_list: string[];
  errorMessage: any;
  datafile: DataFile; 
  addSelectedUsers: string[];
  removeSelectedUsers: string[];
  constructor(private fileService: FileService, private toastService: ToastService, private cookieService: CookieService,) { }

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
    this.fileService.addFilePermissions(this.addSelectedUsers, csrf)
      .subscribe(
        success => {
          console.log('Add permissions success');
          this.toastService.toast('Permissions successfully added');
        },
        error => {
          this.errorMessage = <any>error;
          this.toastService.toast('Add permissions failed with error: ' + <string>error);
        }
      );
  }

  removePermissions(){
    let csrf = this.cookieService.get('csrftoken');
    this.fileService.removeFilePermissions(this.removeSelectedUsers, csrf)
      .subscribe(
        success => {
          console.log('remove permissions success');
          this.toastService.toast('Permissions successfully removed');
        },
        error => {
          this.errorMessage = <any>error;
          this.toastService.toast('Permissions removal failed with error: ' + <string>error);
        }
      );
  }
}
