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

  view_dataset($event){
    console.log("woot");
    console.log($event);
    var filename = $event.target.innerText;
    console.log(filename);
  }

  // test(){
  //   if(this.active_component == "dataset-collection"){
  //     this.active_component = "dataset-view";
  //   }
  //   else {
  //     this.active_component = "dataset-collection";
  //   }
  //   console.log("testing");
  //   console.log(this.active_component);
  // }
}
