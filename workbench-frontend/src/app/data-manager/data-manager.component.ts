import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css']
})
export class DataManagerComponent implements OnInit {

  readonly COLLECTION: string = 'dataset-collection';
  readonly VIEW: string = "dataset-view";

  //Variable to switch between the dataset-collection and dataset-view components
  //Values: 'dataset-collection', 'dataset-view'
  active_component: string = this.COLLECTION;
  dataset_name: string
  constructor() { }

  ngOnInit() {
  }

  view_dataset($event){
    this.active_component = this.VIEW;
    this.dataset_name = $event.target.innerText;
  }
}
