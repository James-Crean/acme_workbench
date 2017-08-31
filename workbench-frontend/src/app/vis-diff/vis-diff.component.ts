import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vis-diff',
  templateUrl: './vis-diff.component.html',
  styleUrls: ['./vis-diff.component.css']
})
export class VisDiffComponent implements OnInit {

  @Input() leftImage: string;
  @Input() rightImage: string;
  sliderVal = "0";
  clipStyle = "";
  constructor() { }

  ngOnInit() {
  }

  diffUpdate($event){
    let sliderVal = $event.target.value;
    console.log()
    if(isNaN(sliderVal)){
      this.sliderVal = "0";
    }
    else{
      this.sliderVal = sliderVal;
    }
    this.clipStyle = "rect(0, 10000px, 10000px, ".concat(this.sliderVal, "px");
    console.log(this.clipStyle);
  }
}
