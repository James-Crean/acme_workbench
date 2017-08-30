import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { VisService } from '../vis.service'
import { DataFile } from '../data-file'

@Component({
  selector: 'vis-sidebar',
  templateUrl: './vis-sidebar.component.html',
  styleUrls: ['./vis-sidebar.component.css']
})
export class VisSidebarComponent implements OnInit {

  fileList: DataFile[];
  @Output()
  exitVis:EventEmitter<void> = new EventEmitter<void>();
  subscription: Subscription;
  constructor(private visService: VisService) {
    this.subscription = this.visService.getImages()
    .subscribe(
      updatedList => {
        this.fileList = updatedList;
      },
      error => console.log(error));
   }

  ngOnInit() {}

  goBack(){
    this.exitVis.emit()
  }

  change_active($event, file){
    this.visService.selectImage(file.path.split("userdata/")[1])
  }

}
