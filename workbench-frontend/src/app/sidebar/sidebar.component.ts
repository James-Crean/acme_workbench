import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'workbench-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  elements: any;
  active_element: string;
  constructor() { }

  ngOnInit() {
    this.elements = [
      {
        id:'DataManager',
        display:'Data Manager'
      },
      {
        id:'RunManager',
        display:'Run Manager'
      },
      {
        id:'Visualizations',
        display:'Visualizations'
      },
      {
        id:'Notifications',
        display:'Notifications'
      },
      {
        id:'Settings',
        display:'Settings'
      }
    ];
  }

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();
  
  change_active($event){
    this.change.emit($event);
  }

}
