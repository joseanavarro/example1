import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { PublishTourPage } from './publish-tour';

@NgModule({
  declarations: [
    PublishTourPage,
  ],
  imports: [
    IonicPageModule.forChild(PublishTourPage),
    TranslateModule.forChild()
  ],
})
export class PublishTourPageModule { }
