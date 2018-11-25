import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { EditAreasPage } from './edit-areas';

@NgModule({
  declarations: [
    EditAreasPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAreasPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class EditAreasPageModule { }
