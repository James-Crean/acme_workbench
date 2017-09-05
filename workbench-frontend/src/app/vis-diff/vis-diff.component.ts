import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'vis-diff',
  templateUrl: './vis-diff.component.html',
  styleUrls: ['./vis-diff.component.css']
})
export class VisDiffComponent implements OnInit {

  @Input() leftImagePath: string = "";
  @Input() rightImagePath: string = "";
  @ViewChild('rightImage') imageElement: any;
  sliderPercent = 0;
  clipStyle = "";
  imageWidth = "100%";
  sliderMaxWidth = "unset";
  currentMode = "swipe";
  availableModes = ["difference", "fade", "swipe"]
  constructor() { }

  ngOnInit() {
  }

  diffUpdate($event){
    let sliderVal = $event.target.value;
    if(isNaN(sliderVal)){
      this.sliderPercent = 0;
    }
    else{
      this.sliderPercent = Number.parseFloat(sliderVal)/10;
    }
    let width = `${this.sliderPercent.toString()}%`;
    this.clipStyle = `polygon(${width} 0, 100% 0, 100% 100%, ${width} 100%)`;
  }

  rightImageLoad($event){
    if(this.leftImagePath && this.rightImagePath){
      this.clipStyle = "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)";
    }
    this.sliderMaxWidth = this.imageElement.nativeElement.offsetWidth.toString();
  }

  windowResize($event){
    this.sliderMaxWidth = this.imageElement.nativeElement.offsetWidth.toString();
  }

  radioSelected(mode: string){
    console.log("Mode selected:", mode);
    if(this.availableModes.indexOf(mode) > -1){
      this.currentMode = mode;
    }
  }
}
