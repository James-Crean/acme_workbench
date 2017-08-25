import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class VisServiceService {

  private images$ = new BehaviorSubject([])

  constructor() { }

  addImage(fileName: string){
    console.log(fileName)
    let images = [ ...this.images$.getValue(), fileName]; 
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
