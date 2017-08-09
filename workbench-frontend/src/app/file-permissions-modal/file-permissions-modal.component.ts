import { Component, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { FileService } from '../file.service'
import { DataFile } from '../data-file'

@Component({
  selector: 'file-permissions-modal',
  templateUrl: './file-permissions-modal.component.html',
  styleUrls: ['./file-permissions-modal.component.css'],
  providers: [FileService] 
})
export class FilePermissionsModalComponent {

  modalActions = new EventEmitter<string|MaterializeAction>();
  user_list: Object[];
  errorMessage: any;
  allowed_users: string[]; 
  constructor(private fileService: FileService) { }

  openModal(allowed_users: string[]){ 
    this.fileService.getUserList()
    .subscribe(
      files => {
        this.user_list = files;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
    this.allowed_users = allowed_users;

    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
