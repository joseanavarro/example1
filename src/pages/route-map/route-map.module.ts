import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteMapPage } from './route-map';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    RouteMapPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteMapPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RouteMapPageModule { }
