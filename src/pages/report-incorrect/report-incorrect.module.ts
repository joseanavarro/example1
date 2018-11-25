import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportIncorrectPage } from './report-incorrect';
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [
    ReportIncorrectPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportIncorrectPage),
    TranslateModule.forChild()
  ],
})
export class ReportIncorrectPageModule { }
