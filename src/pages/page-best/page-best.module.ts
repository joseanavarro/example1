import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { BestPage } from "./page-best";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [BestPage],
  imports: [
    IonicPageModule.forChild(BestPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [BestPage]
})
export class BestPageModule {}
