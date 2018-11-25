import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentsPage } from './comments';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentsPage),
    TranslateModule.forChild()
  ],
})
export class CommentsPageModule { }
