import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { PubTasksPage } from './pub-tasks';

@NgModule({
  declarations: [
    PubTasksPage,
  ],
  imports: [
    IonicPageModule.forChild(PubTasksPage),
    TranslateModule.forChild()
  ],
})
export class PubTasksPageModule { }
