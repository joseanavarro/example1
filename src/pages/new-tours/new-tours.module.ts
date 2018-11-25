import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NewToursPage } from "./new-tours";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [NewToursPage],
  imports: [
    IonicPageModule.forChild(NewToursPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [NewToursPage]
})
export class NewToursPageModule {}
