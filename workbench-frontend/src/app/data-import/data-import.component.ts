import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FileUploader } from 'ng2-file-upload';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent implements OnInit {

  import_types: string[];
  selected_type: string;
  dataset_names: string[];
  selected_dataset_name: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  private errorMessage = undefined;
  private datasetUploadUrl = '/file_manager/upload_dataset/';
  private datasetName: string = undefined;
  public hasBaseDropZoneOver:boolean = false;
  
  @Input() uploader: FileUploader;
  @Input() datasets: any[];
  constructor() { }

  ngOnInit() {
    this.import_types = ['Earth System Grid Federation', 'Globus', 'Upload'];
    this.selected_type = undefined;
  }
  import_select(import_type){
    this.selected_type = import_type;
  }
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  back(){
    this.selected_type = undefined;
  }
  startUpload(){
    if(this.datasetName == undefined && (this.selected_dataset_name == 'new_dataset' || this.selected_dataset_name == undefined)){
      this.errorMessage = "Enter a dataset name";
    } else {
      let newName = '';
      if(this.selected_dataset_name != 'new_dataset'){
        newName = this.selected_dataset_name;
      } else {
        newName = this.datasetName;
      }
      this.errorMessage = undefined;
      let targetUrl = this.datasetUploadUrl + newName;
      this.uploader.getNotUploadedItems().map(item => item.url = targetUrl);
      this.back();
      this.closeModal();
    }
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

}
