import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTourPage } from './new-tour';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    NewTourPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTourPage),
    TranslateModule.forChild()
  ],
})
export class NewTourPageModule { }
