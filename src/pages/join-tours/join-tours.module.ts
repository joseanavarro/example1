import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from 'ionic-angular';
import { JoinToursPage } from './join-tours';

@NgModule({
  declarations: [
    JoinToursPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinToursPage),
    TranslateModule.forChild()
  ],
})
export class AddToursPageModule { }
