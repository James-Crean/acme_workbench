import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  active_component: string;
  title = 'workbench';

  change_active($event){
    this.active_component = $event.target.id;
  }

  exit_vis($event){
    this.active_component = undefined;
  }
}
