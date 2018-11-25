import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailMapPage } from './detail-map';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    DetailMapPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailMapPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class DetailMapPageModule { }
