import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { ListArrowsPage } from './list-arrows';

@NgModule({
  declarations: [
    ListArrowsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListArrowsPage),
    TranslateModule.forChild()
  ],
})
export class ListArrowsPageModule { }
