import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'vis-diff',
  templateUrl: './vis-diff.component.html',
  styleUrls: ['./vis-diff.component.css']
})
export class VisDiffComponent implements OnInit {

  @Input() leftImagePath: string = "";
  @Input() rightImagePath: string = "";
  @ViewChild('rightImage') imageElement: any;
  sliderPercent = 50;
  clipStyle = "";
  opacity = 1;
  imageWidth = "100%";
  sliderMaxWidth = "";
  currentMode = "swipe";
  availableModes = ["difference", "fade", "swipe", "side-by-side"]
  imageClass = "stack-image" //Either: "stack-image", or "side-by-side" 
  constructor() { }

  ngOnInit() {
  }

  sliderChange($event){
    let sliderVal = $event.target.value;
    if(isNaN(sliderVal)){
      this.sliderPercent = 0;
    }
    else{
      this.sliderPercent = Number.parseFloat(sliderVal)/10;
    }
    this.diffUpdate()
  }

  rightImageLoad($event){
    if(this.leftImagePath && this.rightImagePath ){
      this.diffUpdate();
    }
  }

  windowResize($event){
    this.sliderMaxWidth = this.imageElement.nativeElement.offsetWidth.toString();
  }

  radioSelected(mode: string){
    if(this.availableModes.indexOf(mode) > -1){
      this.currentMode = mode;
      if(this.currentMode == 'side-by-side'){
        this.imageClass = "side-by-side"
      }
      else{
        this.imageClass = "stack-image";
        setTimeout(() => { //Allow Angular to update the image size before we attempt to get it. 
         this.sliderMaxWidth = this.imageElement.nativeElement.offsetWidth.toString();
        }, 0)
      }
    }
    this.diffUpdate();
  }

  diffUpdate(){
    this.clipStyle = "";
    this.opacity = 1;

    if(this.currentMode == "swipe"){
      let width = `${this.sliderPercent.toString()}%`;
      this.clipStyle = `polygon(${width} 0, 100% 0, 100% 100%, ${width} 100%)`;
    }
    else if(this.currentMode == "fade"){  
      this.opacity = this.sliderPercent/100;
    }
    else if(this.currentMode == "side-by-side"){
      
    }
  }
}
