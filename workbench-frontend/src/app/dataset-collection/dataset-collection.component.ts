import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.css']
})
export class DatasetCollectionComponent implements OnInit {

  //Stores the list of datasets available to the user.
  datasets:Object[];

  constructor() { }

  ngOnInit() {
    this.datasets = [
      { filename: "casescript1-example.nc" },
      { filename: "casescript2-example.nc" },
      { filename: "casescript3-example.nc" },
      { filename: "casescript4-example.nc" },
      { filename: "casescript5-example.nc" },
      { filename: "casescript6-example.nc" }
    ]
  }

  @Output()
  viewDataset: EventEmitter<string> = new EventEmitter<string>();

  pick_dataset($event){
      this.viewDataset.emit($event);
  }
}
