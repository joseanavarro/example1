import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { MyPhotosPage } from './my-photos';

@NgModule({
  declarations: [
    MyPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPhotosPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class MyPhotosPageModule { }
