import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataSet } from '../data-set'
import { FileUploader } from 'ng2-file-upload';

import { FileService } from '../file.service'
import { ToastService } from '../toast.service'
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css'],
  providers: [
    FileService,
    ToastService
  ]  
})
export class DataManagerComponent implements OnInit {

  //Variable to switch between the dataset-collection and dataset-view components
  //Values: 'dataset-collection', 'dataset-view'
  readonly COLLECTION: string = 'dataset-collection';
  readonly VIEW: string = "dataset-view";
  active_component: string = this.COLLECTION;

  dataset_name: string;
  dataset_info: DataSet;
  datasets: any;
  errorMessage: any;
  private datasetUploadUrl = '/index/upload_dataset/';
  private datasetName = 'my_new_dataset';
  private uploader = new FileUploader({});
  constructor(
    private fileService: FileService,
    private toastService: ToastService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.update();
    this.uploader.onCompleteAll = this.onComplete;
    console.log('globus_is_authenticated', this.cookieService.get('globus_is_authenticated'))
  }
  onComplete(){
    let self = <any>this;
    self.queue = [];
  }
  update(): any{
    this.fileService.getDataSetList()
    .subscribe(
      files => {
        this.datasets = [];
        for(let item of files){
          this.datasets.push(new DataSet({
            name: <string>item.name,
            metadata: <string[]>item.metadata,
            file_list: <string[]>item.file_list,
            allowed_access: <string[]>item.allowed_access
          }));
        } 
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }
  upload(){
    this.uploader.uploadAll();
    this.uploadCheck();
  }
  uploadCheck(){
    if(this.uploader.queue.length){
      setTimeout(() => {
        this.uploadCheck();
      }, 200)
    } else {
      this.update();
      this.toastService.toast('Dataset upload complete');
    }
  }
  deleteSuccess(){
    this.update();
    this.show_dataset_collection();
  }
  view_dataset(i){
    this.active_component = this.VIEW;
    this.dataset_info = this.datasets[i];
  }
  show_dataset_collection(){
    this.active_component = this.COLLECTION;
  }
}
