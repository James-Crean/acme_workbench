import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileService } from '../file.service'
import { DataSet } from '../data-set'

@Component({
  selector: 'dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.css'],
  providers: [FileService]  
})
export class DatasetCollectionComponent implements OnInit {

  datasets: any[];
  errorMessage: string;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileService.getDataSetList()
      .subscribe(
        files => {
          this.datasets = files;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  @Output()
  viewDataset: EventEmitter<string> = new EventEmitter<string>();

  pick_dataset($event){
      this.viewDataset.emit($event);
  }
}
