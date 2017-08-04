import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css']
})
export class DataManagerComponent implements OnInit {

  active_component: string = "dataset-collection";
  constructor() { }

  ngOnInit() {
  }
}
