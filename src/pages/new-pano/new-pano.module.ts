import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPanoPage } from './new-pano';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    NewPanoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPanoPage),
    TranslateModule.forChild()
  ],
})
export class NewPanoPageModule { }
