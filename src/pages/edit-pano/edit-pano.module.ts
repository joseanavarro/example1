import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { EditPanoPage } from './edit-pano';

@NgModule({
  declarations: [
    EditPanoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPanoPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class EditPanoPageModule { }
