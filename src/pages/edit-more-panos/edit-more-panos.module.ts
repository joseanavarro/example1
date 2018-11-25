import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { EditMorePanosPage } from './edit-more-panos';

@NgModule({
  declarations: [
    EditMorePanosPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMorePanosPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class EditMorePanosPageModule { }
