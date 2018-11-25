import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportInadequatePage } from './report-inadequate';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ReportInadequatePage,
  ],
  imports: [
    IonicPageModule.forChild(ReportInadequatePage),
    TranslateModule.forChild()
  ],
})
export class ReportInadequatePageModule { }
