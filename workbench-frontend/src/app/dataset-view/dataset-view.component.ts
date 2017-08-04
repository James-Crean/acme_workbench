import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../file.service'

@Component({
  selector: 'dataset-view',
  templateUrl: './dataset-view.component.html',
  styleUrls: ['./dataset-view.component.css'],
  providers: [FileService]  
})
export class DatasetViewComponent implements OnInit {

  file_list: Object[];
  @Input() datasetName: string;
  @Input() dataset: any;

  constructor(private fileService: FileService) { }

  ngOnInit() { }
}
