import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@IonicPage()
@Component({
  selector: 'page-edit-arrows',
  templateUrl: 'edit-arrows.html',
})
export class EditArrowsPage {

  public tour: TourItem;
  areas: TourArea[];
  panos: TourItem[];
  panoId: string;
  logt: string;
  ti: string;
  area: string;
  viewPanos: boolean;
  viewAreas: boolean;
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public restApi: RestApiProvider
  ) {
    this.logt = "EditArrowsPage | ";
    let ti = this.logt + "constructor";
    this.viewAreas = false;
    this.viewPanos = false;
    this.loading = true;
    // Leer parámetros de entrada
    this.tour = navParams.get("tour");
    this.panoId = navParams.get("panoId");
    this.area = navParams.get("area");

    // Pedir la lista de panoramas 
    this.restApi.getPanosArea(this.tour.id, this.area).subscribe(res => {
      this.panos = res.Panos;
      if (this.panos.length > 1) {
        this.viewPanos = true;
      } else {
        this.viewPanos = false;
      }
      this.loading = true;
    }, (err) => {
      this.logger.error(this.ti, "Error: ", err);
      this.loading = true;
    });

    // Leer las áreas del tour
    this.restApi.getAreas(this.tour.id).subscribe(res => {
      this.areas = res.Elems;
      if (this.areas.length > 1) {
        this.viewAreas = true;
      } else {
        this.viewAreas = false;
      }
      this.loading = true;
    }, (err) => {
      this.logger.error(this.ti, "Error: ", err);
      this.loading = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditArrowsPage');
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
