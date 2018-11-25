import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { ConnectArrowsPage } from './connect-arrows';

@NgModule({
  declarations: [
    ConnectArrowsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectArrowsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ConnectArrowsPageModule { }
