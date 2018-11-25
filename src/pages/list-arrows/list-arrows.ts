import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotSpot } from "../../models/hotSpot";
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@IonicPage()
@Component({
  selector: 'page-list-arrows',
  templateUrl: 'list-arrows.html',
})
export class ListArrowsPage {

  public tour: TourItem;
  areas: TourArea[];
  pano: TourItem;
  hotspots: HotSpot[];
  panoId: string;
  logt: string;
  ti: string;
  area: string;
  loading: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logger: Logger,
    private insomnia: Insomnia,
    public restapi: RestApiProvider
  ) {
    // Leer parámetros de entrada
    this.tour = navParams.get("tour");
    this.pano = navParams.get("pano");
    this.area = navParams.get("area");
    this.panoId = this.pano.id_pano;
  }

  /**
  * It’s fired when entering a page, before it becomes the active one. 
  * Use it for tasks you want to do every time you enter in the view 
  * (setting event listeners, updating a table, etc.).
  * 
  * @memberof TourDetailPage
  */
  ionViewWillEnter() {
    // Leer los hotspots existentes
    this.restapi.getHotSpots(this.panoId)
      .then((res) => {
        if (res.Items.length === 0) {
          // Saltar a la página de añadir hotspot
          this.navCtrl.push("EditArrowsPage", { command: 'c', tour: this.tour, panoId: this.panoId, area: this.area });
        } else {
          this.hotspots = res.Items;
          this.loading = false;
        }
      });
  }

  /**
    * Saltar a la página de edición de flechas
    *
    * @memberof EditMorePanosPage
    */
  addArrow() {
    this.navCtrl.push("EditArrowsPage", { tour: this.tour, panoId: this.panoId, area: this.area });
  }

  /**
    * Saltar a la página de edición de flechas
    *
    * @memberof EditMorePanosPage
    */
  deleteArrow(item: HotSpot) {
    this.navCtrl.push("ConnectArrowsPage", { command: 3, tour: this.tour, arrow: item });
  }

  /**
    * Saltar a la página de edición de flechas
    *
    * @memberof EditMorePanosPage
    */
  editArrow(item: HotSpot) {
    this.navCtrl.push("ConnectArrowsPage", { command: 2, tour: this.tour, arrow: item });
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
