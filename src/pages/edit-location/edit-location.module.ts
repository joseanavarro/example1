import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { EditLocationPage } from './edit-location';

@NgModule({
  declarations: [
    EditLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EditLocationPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class EditLocationPageModule { }
