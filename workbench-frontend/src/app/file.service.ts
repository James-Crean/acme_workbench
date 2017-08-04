import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

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

  getDataSetList(): Observable<any[]>{
    return this.http.get(this.getDataSetListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDataSet(): Observable<DataSet>{
    return this.http.get(this.getDataSetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getFileInfo(fileName: string, dataSetName: string): Observable<DataFile>{
    let params = new URLSearchParams();
    params.set('data_file_name', fileName);
    params.set('data_set_name', dataSetName);

    let options = new RequestOptions();
    options.params = params;
    return this.http.get(this.getFileInfoUrl, options)
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
