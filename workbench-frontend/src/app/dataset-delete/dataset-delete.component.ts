import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { NgModel } from '@angular/forms';

import { FileService } from '../file.service'
import { CookieService } from 'ngx-cookie';
import { ToastService } from '../toast.service'


@Component({
  selector: 'dataset-delete',
  templateUrl: './dataset-delete.component.html',
  styleUrls: ['./dataset-delete.component.css'],
  providers: [
    FileService,
    ToastService
  ]  
})
export class DatasetDeleteComponent implements OnInit {

  @Input() dataset: any;
  errorMessage: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  @Output() deleteSuccess = new EventEmitter();
  
  constructor(
    private fileService: FileService,
    private cookieService: CookieService,
    private toastService: ToastService) { }
  
  ngOnInit() { }
  deleteDataset(){
    console.log('deleting ' + this.dataset.name);
    let csrf = this.cookieService.get('csrftoken');
    this.fileService.deleteDataset(this.dataset.name, csrf)
    .subscribe(
      success => {
        console.log('delete success');
        this.closeModal();
        this.deleteSuccess.emit();
        this.toastService.toast('Dataset successfully deleted');
      },
      error => {
        this.errorMessage = <any>error;
        this.toastService.toast('Dataset deletion failed with error: ' + <string>error);
      }
    );
  }
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
