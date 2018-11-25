import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { MyPublishedPhotosPage } from './my-published-photos';

@NgModule({
  declarations: [
    MyPublishedPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPublishedPhotosPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class MyPublishedPhotosPageModule { }
