import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchListPage } from './search-list';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    SearchListPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class SearchListPageModule { }
