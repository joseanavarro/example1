import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePanosPage } from './more-panos';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MorePanosPage,
  ],
  imports: [
    IonicPageModule.forChild(MorePanosPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class MorePanosPageModule { }
