import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowAreasPage } from './show-areas';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ShowAreasPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowAreasPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ShowAreasPageModule { }
