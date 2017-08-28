import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vis-sidebar',
  templateUrl: './vis-sidebar.component.html',
  styleUrls: ['./vis-sidebar.component.css']
})
export class VisSidebarComponent implements OnInit {

  elements = [];
  @Output()
  exitVis:EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  goBack(){
    this.exitVis.emit()
  }

}
