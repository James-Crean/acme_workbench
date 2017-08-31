import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterializeModule } from "angular2-materialize";
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { VisManagerComponent } from './vis-manager/vis-manager.component';
import { RunManagerComponent } from './run-manager/run-manager.component';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { DatasetCollectionComponent } from './dataset-collection/dataset-collection.component';
import { DatasetViewComponent } from './dataset-view/dataset-view.component';
import { DataImportComponent } from './data-import/data-import.component';
import { DatasetDeleteComponent } from './dataset-delete/dataset-delete.component';
import { FilePermissionsModalComponent } from './file-permissions-modal/file-permissions-modal.component';
import { VisSidebarComponent } from './vis-sidebar/vis-sidebar.component';
import { VisService } from './vis.service';
import { VisDiffComponent } from './vis-diff/vis-diff.component'

@NgModule({
  declarations: [
    AppComponent,
    DataManagerComponent,
    VisManagerComponent,
    RunManagerComponent,
    NotificationManagerComponent,
    SidebarComponent,
    SettingsComponent,
    DatasetCollectionComponent,
    DatasetViewComponent,
    DataImportComponent,
    FileDropDirective, 
    FileSelectDirective, 
    DatasetDeleteComponent,
    FilePermissionsModalComponent,
    VisSidebarComponent,
    VisDiffComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    FormsModule,
    CookieModule.forRoot(),
  ],
  providers: [VisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
