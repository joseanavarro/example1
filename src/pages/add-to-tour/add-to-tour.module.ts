import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { AddToTourPage } from './add-to-tour';

@NgModule({
  declarations: [
    AddToTourPage,
  ],
  imports: [
    IonicPageModule.forChild(AddToTourPage),
    TranslateModule.forChild()
  ],
})
export class AddToTourPageModule { }
