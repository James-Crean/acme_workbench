import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { DataFile } from './data-file'

@Injectable()
export class VisService {

  private images$ = new BehaviorSubject([])

  constructor() { }

  addImage(file: DataFile){
    console.log("Service adding: ", file)
    let images = [ ...this.images$.getValue(), file]; 
    console.log(images);
    this.images$.next(images);
  }

  removeImage(fileToRemove: string){
    let images = this.images$.getValue().filter(fileName => fileName != fileToRemove);
    this.images$.next(images)
  }

  getImages(){
    return this.images$.asObservable();
  }
}
