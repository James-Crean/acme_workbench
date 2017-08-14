import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DataFile } from './data-file'
import { DataSet } from './data-set'

@Injectable()
export class FileService {

  private getDataSetListUrl =        '/file_manager/get_data_set_list/';
  private getDataSetUrl =            '/file_manager/get_data_set/';
  private getFileInfoUrl =           '/file_manager/get_file_info/';
  private deleteDatasetUrl =         '/file_manager/delete_dataset/';
  private changeFilePermissionsUrl = '/file_manager/change_file_permissions/';  
  private getUserListUrl =           '/get_user_list/';

  constructor(private http: Http) { }

  getDataSetList(): Observable<any[]>{
    return this.http.get(this.getDataSetListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getUserList(): Observable<string[]>{
    return this.http.get(this.getUserListUrl)
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
  deleteDataset(name: string, csrf: string): Observable<any>{
    let headers = new Headers();
    headers.set('X-CSRFToken', csrf);

    let options = new RequestOptions();
    options.headers = headers;
    return this.http.delete(this.deleteDatasetUrl + name, options)
      .catch(this.handleError);
  }
  addFilePermissions(users: string[], id: number, csrf: string): Observable<any>{
    let options = new RequestOptions();
    options.headers = new Headers({'X-CSRFToken': csrf});
    let body = {'user_list': users, "file": id};
    console.log(body)
    return this.http.post(this.changeFilePermissionsUrl, body, options)
      .catch(this.handleError);
  }
  removeFilePermissions(users: string[], id: number, csrf: string): Observable<any>{
    let options = new RequestOptions();
    options.headers = new Headers({'Content-Type': 'application/json', 'X-CSRFToken': csrf});
    options.body = {'user_list': users, "file": id}
    return this.http.delete(this.changeFilePermissionsUrl, options)
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
