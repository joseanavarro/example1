import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowErrorPage } from './show-error';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ShowErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowErrorPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ShowErrorPageModule { }
