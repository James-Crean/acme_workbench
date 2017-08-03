import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.css']
})
export class DatasetCollectionComponent implements OnInit {

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

}
