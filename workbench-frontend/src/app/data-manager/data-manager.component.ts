import { Component, OnInit } from '@angular/core';
import { DataSet } from '../data-set'
import { FileService } from '../file.service'

@Component({
  selector: 'data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css'],
  providers: [FileService]  
})
export class DataManagerComponent implements OnInit {

  readonly COLLECTION: string = 'dataset-collection';
  readonly VIEW: string = "dataset-view";

  //Variable to switch between the dataset-collection and dataset-view components
  //Values: 'dataset-collection', 'dataset-view'
  active_component: string = this.COLLECTION;
  dataset_name: string;
  dataset_info: DataSet;
  datasets: any;
  errorMessage: any;
  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileService.getDataSetList()
    .subscribe(
      files => {
        this.datasets = [];
        for(let item of files){
          this.datasets.push(new DataSet({
            name: <string>item.name,
            metadata: <string[]>item.metadata,
            file_list: <string[]>item.file_list,
            allowed_access: <string[]>item.allowed_access
          }));
        } 
        console.log(this.datasets);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  view_dataset(i){
    this.active_component = this.VIEW;
    this.dataset_info = this.datasets[i];
  }

  show_dataset_collection(){
    this.active_component = this.COLLECTION;
  }
}
