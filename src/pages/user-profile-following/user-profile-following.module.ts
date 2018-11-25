import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileFollowingPage } from './user-profile-following';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    UserProfileFollowingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfileFollowingPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class UserProfileFollowingPageModule { }
