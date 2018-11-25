import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearMapPage } from './near-map';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    NearMapPage,
  ],
  imports: [
    IonicPageModule.forChild(NearMapPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class NearMapPageModule { }
