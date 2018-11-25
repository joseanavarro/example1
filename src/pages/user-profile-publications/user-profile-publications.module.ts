import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilePublicationsPage } from './user-profile-publications';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    UserProfilePublicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfilePublicationsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class UserProfilePublicationsPageModule { }
