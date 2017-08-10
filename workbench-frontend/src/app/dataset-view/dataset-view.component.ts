import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';


import { FilePermissionsModalComponent } from '../file-permissions-modal/file-permissions-modal.component' 
import { FileService } from '../file.service'
import { DataFile } from '../data-file'

@Component({
  selector: 'dataset-view',
  templateUrl: './dataset-view.component.html',
  styleUrls: ['./dataset-view.component.css'],
  providers: [FileService]  
})
export class DatasetViewComponent implements OnInit {

  @ViewChild(FilePermissionsModalComponent)
  private filePermissionsModal: FilePermissionsModalComponent;
  file_list: Object[];
  fileInfoList: DataFile[];
  errorMessage: string;
  @Input() dataset: any;
  @Output() showDatasetCollection: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileInfoList = new Array(this.dataset.file_list.length);
  }

  getFileInfo(i){
    if(this.fileInfoList[i]){
      return;
    }
    this.fileService.getFileInfo(this.dataset.file_list[i], this.dataset.name)
    .subscribe(
      file => {
        let newFile = new DataFile({
          id: <number>file.id, 
          path: <string>file.path,
          display_name: <string>file.display_name,
          owner: <string>file.owner,
          allowed_access: <string[]>file.allowed_access,
          data_type: <number>file.data_type              
        });
        this.fileInfoList[i] = newFile;
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  go_back(){
    this.showDatasetCollection.emit();
  }

  openModal(index: number){
    this.filePermissionsModal.openModal(this.fileInfoList[index]);
  }
}
