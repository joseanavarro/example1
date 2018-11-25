import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearListPage } from './near-list';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    NearListPage,
  ],
  imports: [
    IonicPageModule.forChild(NearListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class NearListPageModule { }
