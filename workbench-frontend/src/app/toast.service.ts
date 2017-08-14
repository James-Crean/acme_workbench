import { Injectable } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

declare var Materialize:any;

@Injectable()
export class ToastService {

  constructor() { }

  toast(text: string, duration: number = 3000, style: string = ""){
    Materialize.toast(text, duration, style);
  }
}
