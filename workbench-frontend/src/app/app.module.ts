import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GlDirective } from './gl.directive';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { VisManagerComponent } from './vis-manager/vis-manager.component';
import { RunManagerComponent } from './run-manager/run-manager.component';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    GlDirective,
    DataManagerComponent,
    VisManagerComponent,
    RunManagerComponent,
    NotificationManagerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
