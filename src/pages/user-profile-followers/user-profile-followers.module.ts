import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileFollowersPage } from './user-profile-followers';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    UserProfileFollowersPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfileFollowersPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class UserProfileFollowersPageModule { }
