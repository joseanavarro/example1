import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteDetailPage } from './route-detail';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    RouteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteDetailPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RouteDetailPageModule { }
