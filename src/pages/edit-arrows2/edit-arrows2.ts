import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourItem } from "../../models/tourItem";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@IonicPage()
@Component({
  selector: 'page-edit-arrows2',
  templateUrl: 'edit-arrows2.html',
})
export class EditArrows2Page {

  logt: string;
  viewPanos: boolean;
  loading: boolean;
  tour: TourItem;
  area: string;
  panoId: string;
  panos: TourItem[];
  ti: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public restApi: RestApiProvider
  ) {
    this.logt = "EditArrowsPage | ";
    this.ti = this.logt + "constructor";
    this.viewPanos = false;
    this.loading = true;
    // Leer parámetros de entrada
    this.tour = navParams.get("tour");
    this.panoId = navParams.get("connect1");
    this.area = navParams.get("area");

    // Pedir la lista de panoramas 
    this.restApi.getPanosArea(this.tour.id, this.area).subscribe(res => {
      this.panos = res.Panos;
      this.viewPanos = true;
      this.loading = false;
    }, (err) => {
      this.logger.error(this.ti, "Error: ", err);
      this.loading = false;
    });
  }

  /**
   * Volver a la página de 'mis fotos'
   *
   * @memberof EditAreasPage
   */
  goBack() {
    this.navCtrl.setRoot("MyPhotosPage");
  }

}
