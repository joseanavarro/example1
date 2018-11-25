import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishPage } from './publish';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    PublishPage,
  ],
  imports: [
    IonicPageModule.forChild(PublishPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class PublishPageModule { }
