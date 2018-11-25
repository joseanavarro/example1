import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { PipesModule } from "../pipes/pipes.module";
import { UtilProvider } from "../providers/util/util";
import { AreaThumbComponent } from './area-thumb/area-thumb';
import { FlwItemComponent } from './flw-item/flw-item';
import { MapComponent } from './map/map';
import { MyphotosHeaderComponent } from './myphotos-header/myphotos-header';
import { NearHeaderComponent } from './near-header/near-header';
import { PreloadImage } from './preload-image/preload-image';
import { ProfileHeaderComponent } from './profile-header/profile-header';
import { RouteHeaderComponent } from './route-header/route-header';
import { RouteItemComponent } from './route-item/route-item';
import { TourItemComponent } from "./tour-item/tour-item";
import { TourListComponent } from './tour-list/tour-list';
import { TourThumbComponent } from './tour-thumb/tour-thumb';
import { UserHeaderComponent } from './user-header/user-header';
import { EditAreaThumbComponent } from './edit-area-thumb/edit-area-thumb';
import { EditTourThumbComponent } from './edit-tour-thumb/edit-tour-thumb';

@NgModule({
  declarations: [
    TourItemComponent,
    TourListComponent,
    TourThumbComponent,
    AreaThumbComponent,
    ProfileHeaderComponent,
    FlwItemComponent,
    PreloadImage,
    NearHeaderComponent,
    UserHeaderComponent,
    RouteItemComponent,
    RouteHeaderComponent,
    MapComponent,
    MyphotosHeaderComponent,
    EditAreaThumbComponent,
    EditTourThumbComponent],
  imports: [IonicModule, PipesModule, TranslateModule.forChild()],
  exports: [
    TourItemComponent,
    TourListComponent,
    TourThumbComponent,
    AreaThumbComponent,
    ProfileHeaderComponent,
    FlwItemComponent,
    PreloadImage,
    NearHeaderComponent,
    UserHeaderComponent,
    RouteItemComponent,
    RouteHeaderComponent,
    MapComponent,
    MyphotosHeaderComponent,
    EditAreaThumbComponent,
    EditTourThumbComponent],
  providers: [UtilProvider]
})
export class ComponentsModule { }
