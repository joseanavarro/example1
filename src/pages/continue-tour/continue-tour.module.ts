import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ContinueTourPage } from './continue-tour';

@NgModule({
  declarations: [
    ContinueTourPage,
  ],
  imports: [
    IonicPageModule.forChild(ContinueTourPage),
    TranslateModule.forChild()
  ],
})
export class ContinueTourPageModule { }
