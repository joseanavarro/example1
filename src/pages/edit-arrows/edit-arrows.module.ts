import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { EditArrowsPage } from './edit-arrows';

@NgModule({
  declarations: [
    EditArrowsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditArrowsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class EditArrowsPageModule { }
