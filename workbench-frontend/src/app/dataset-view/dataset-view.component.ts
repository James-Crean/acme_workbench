import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'dataset-view',
  templateUrl: './dataset-view.component.html',
  styleUrls: ['./dataset-view.component.css']
})
export class DatasetViewComponent implements OnInit {

  file_list: Object[];
  constructor() { }

  ngOnInit() {
    this.file_list = [
      {name: "file1"},
      {name: "file2"},
      {name: "file3"},
      {name: "file4"},
      {name: "file5"},
      {name: "file6"},
    ];

    //$('.collapsible').collapsible();
        
  }

  @Input() datasetName: string;
}
