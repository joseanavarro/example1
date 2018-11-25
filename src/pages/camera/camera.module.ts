import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraPage } from './camera';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CameraPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraPage),
    TranslateModule.forChild()
  ],
})
export class CameraPageModule { }
