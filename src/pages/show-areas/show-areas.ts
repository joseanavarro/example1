import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { GeoProvider } from "../../providers/geo/geo";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-show-areas',
  templateUrl: 'show-areas.html',
})
export class ShowAreasPage {
  public tour: TourItem;
  areas: TourArea[];
  panos: TourItem[];
  logt: string;

  /**
   * Creates an instance of ShowAreasPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {Logger} logger 
   * @memberof ShowAreasPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public util: UtilProvider,
    public geo: GeoProvider
  ) {
    this.logt = "ShowAreasPage | ";
    let ti = this.logt + "constructor";
    // Leer parámetros de entrada
    this.tour = navParams.get("tour");
    this.areas = navParams.get("areas");

    this.logger.debug(ti, "Creada página de mostrar áreas del tour");
  }

  ionViewDidLoad() {
    let ti = this.logt + "ionViewDidLoad";
    this.logger.debug(ti, 'ionViewDidLoad MorePanosPage');
    // if (this.areas.length = 1) {
    //   this.navCtrl.push("MorePanosPage", { area: this.areas[0], tour: this.tour, areaname: '' });
    // }
  }

  /**
  * Obtener el nombre correcto de la ubicación del panorama
  *
  * @param {TourItem} item
  * @returns
  * @memberof TourItemComponent
  */
  getLocationName(item: TourItem) {
    return this.geo.getLocationName(item);
  }

}
