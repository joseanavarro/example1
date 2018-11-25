import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { EditLocalPanoPage } from './edit-local-pano';

@NgModule({
  declarations: [
    EditLocalPanoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditLocalPanoPage),
    TranslateModule.forChild()
  ],
})
export class EditLocalPanoPageModule { }
