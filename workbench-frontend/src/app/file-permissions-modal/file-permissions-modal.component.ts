import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { FileService } from '../file.service'

@Component({
  selector: 'file-permissions-modal',
  templateUrl: './file-permissions-modal.component.html',
  styleUrls: ['./file-permissions-modal.component.css'],
  providers: [FileService] 
})
export class FilePermissionsModalComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();
  user_list: Object[]; //will need to be changed from just string eventually
  errorMessage: any;
  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  openModal(){
    this.fileService.getUserList()
    .subscribe(
      files => {
        this.user_list = files;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
