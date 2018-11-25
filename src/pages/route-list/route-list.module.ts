import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteListPage } from './route-list';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    RouteListPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RouteListPageModule { }
