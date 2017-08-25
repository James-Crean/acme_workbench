import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";

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
  currentFileIndex: number;
  errorMessage: string;
  @Input() dataset: any;
  @Output() showDatasetCollection: EventEmitter<string> = new EventEmitter<string>();
  dropdownActions = new EventEmitter<string|MaterializeAction>();
  currentDropdownIndex: number;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileInfoList = new Array(this.dataset.file_list.length);
  }

  getFileInfo(i, callback = undefined){
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
        if(callback){
          callback();
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  go_back(){
    this.showDatasetCollection.emit();
  }

  openModal(index: number){
    this.currentFileIndex = index; 
    this.filePermissionsModal.openModal(this.fileInfoList[index]);
  }

  updatePermissions($event){
    console.log($event);
    this.fileService.getFileInfo($event, this.dataset.name).subscribe(
      file => {
        let newFile = new DataFile({
          id: <number>file.id, 
          path: <string>file.path,
          display_name: <string>file.display_name,
          owner: <string>file.owner,
          allowed_access: <string[]>file.allowed_access,
          data_type: <number>file.data_type
        });
        this.fileInfoList[this.currentFileIndex] = newFile;
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  setIndex(i: number){
    console.log("preparing index: ", i);
    this.currentDropdownIndex = i;
  }
  
  //1. When the user clicks the dropdown for "Send to visualization" an event is passed.
  //2. We stop event propagation to prevent the collapsible from triggering 
  //3. We manually close the dropdown since it will not receive the bubbled event
  //4. Make sure the fileInfo has been loaded from the server
  //5. If not, we get the file info, and pass a callback function.
  sendToVis($event?){ 
    if($event){ //1
      $event.stopPropagation(); //2
      this.dropdownActions.emit({action:"dropdown", params:['close']}); //3
    }
    if(this.fileInfoList[this.currentDropdownIndex]){ //4 
      console.log("Content is loaded. free to send");
    }
    else{ //5 
      console.log("no data yet, fetching....")
      this.getFileInfo(this.currentDropdownIndex, this.sendToVis.bind(this))
    }
  }
}
