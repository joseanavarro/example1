import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { EditTourPage } from './edit-tour';

@NgModule({
  declarations: [
    EditTourPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTourPage),
    TranslateModule.forChild()
  ],
})
export class EditTourPageModule { }
