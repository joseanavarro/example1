import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TourDetailPage } from "./tour-detail";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [TourDetailPage],
  imports: [
    IonicPageModule.forChild(TourDetailPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [TourDetailPage]
})
export class TourDetailPageModule { }
