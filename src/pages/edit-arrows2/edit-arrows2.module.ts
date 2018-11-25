import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { EditArrows2Page } from './edit-arrows2';

@NgModule({
  declarations: [
    EditArrows2Page,
  ],
  imports: [
    IonicPageModule.forChild(EditArrows2Page),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class EditArrows2PageModule { }
