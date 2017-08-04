import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FileService } from '../file.service'
import { DataSet } from '../data-set'

@Component({
  selector: 'dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.css'],
  providers: [FileService]  
})
export class DatasetCollectionComponent implements OnInit {

  //Stores the list of datasets available to the user.
  errorMessage: string;
  @Input() datasets;
  @Output()
  viewDataset: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fileService: FileService) { }

  ngOnInit() {}

  pick_dataset($event, i){
    this.viewDataset.emit(i);
  }
}
