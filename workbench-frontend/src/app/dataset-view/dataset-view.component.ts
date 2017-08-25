import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';

import { ContextMenuModule, ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu'

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
  @ViewChild('fileMenu') public fileMenu: ContextMenuComponent;
  private filePermissionsModal: FilePermissionsModalComponent;
  file_list: Object[];
  fileInfoList: DataFile[];
  currentFileIndex: number;
  errorMessage: string;
  @Input() contextMenu: ContextMenuComponent;
  @Input() dataset: any;
  @Output() showDatasetCollection: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fileService: FileService, private contextMenuService: ContextMenuService) { }

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

  public openMenu($event: MouseEvent, item: any): void {
    console.log(this.fileMenu)
    this.contextMenuService.show.next({
      contextMenu: this.fileMenu,
      event: $event,
      item: item,
    });
    $event.preventDefault();
    $event.stopPropagation();
  }
  
  sendToVis(i: any){
    console.log(i)
  }
}
