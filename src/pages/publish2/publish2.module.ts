import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { Publish2Page } from './publish2';

@NgModule({
  declarations: [
    Publish2Page,
  ],
  imports: [
    IonicPageModule.forChild(Publish2Page),
    TranslateModule.forChild()
  ],
})
export class Publish2PageModule { }
