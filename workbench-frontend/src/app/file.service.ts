import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DataFile } from './data-file'
import { DataSet } from './data-set'

@Injectable()
export class FileService {

  private getDataSetListUrl = '/file_manager/get_data_set_list/';
  private getDataSetUrl = '/file_manager/get_data_set/';
  private getFileInfoUrl = '/file_manager/get_file_info/';

  constructor(private http: Http) { }

  getDataSetList(): Observable<string[]>{
    return this.http.get(this.getDataSetListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDataSet(): Observable<DataSet>{
    return this.http.get(this.getDataSetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getFileInfo(): Observable<DataFile>{
    return this.http.get(this.getFileInfoUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: Response | any){
    console.log('ERROR');
    console.log(error.toString())
    return Observable.throw(error.toString());
  }
}
