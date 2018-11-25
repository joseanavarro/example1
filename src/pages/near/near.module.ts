import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearPage } from './near';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    NearPage,
  ],
  imports: [
    IonicPageModule.forChild(NearPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class NearPageModule { }
