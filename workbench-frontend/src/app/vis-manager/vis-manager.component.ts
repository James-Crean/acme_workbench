import { Component, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { VisService } from '../vis.service';

@Component({
  selector: 'vis-manager',
  templateUrl: './vis-manager.component.html',
  styleUrls: ['./vis-manager.component.css']
})
export class VisManagerComponent implements OnInit {

  imagesDisplayed = ["",""]; //Holds the path of the images currently selected. for instance: my_dataset/c1.jpg
  activeTab = 0;
  imageDiff: any;
  constructor(private visService: VisService) {
    this.visService.imageSelected()
      .subscribe(
        path => {
          this.imagesDisplayed[this.activeTab] = path;
        },
        error => console.log(error));
  }

  ngOnInit() {
  }

  selectTab(index: number){
    this.activeTab = index;
  }

}
