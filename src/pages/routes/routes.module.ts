import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesPage } from './routes';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    RoutesPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RoutesPageModule { }
