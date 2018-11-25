import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VrViewPage } from './vr-view';

@NgModule({
  declarations: [
    VrViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VrViewPage),
  ],
})
export class VrViewPageModule {}
