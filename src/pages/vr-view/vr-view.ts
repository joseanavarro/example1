import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";

@IonicPage()
@Component({
  selector: 'page-vr-view',
  templateUrl: 'vr-view.html',
})
export class VrViewPage {

  public pano: TourItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.pano = navParams.get("item");

  }

  /**
   * It’s fired when entering a page, before it becomes the active one. 
   * Use it for tasks you want to do every time you enter in the view 
   * (setting event listeners, updating a table, etc.).
   * 
   * @memberof TourDetailPage
   */
  ionViewWillEnter() {
    // Inicializar panorama    
    this.initPano(this.pano);
  }


  /**
   * Inicializar y cargar la vista del panorama
   *
   * @param {TourItem} item
   * @memberof TourDetailPage
   */
  initPano(item: TourItem) {

    setTimeout(function () {
      (<any>window).removepano("krpano-embed");
      (<any>window).embedpano({
        swf: "assets/js/krpano/krpano.js",
        html5: "prefer",
        xml: AppConstants.KRPANO_API + "/mapp-" + item.id_pano + AppConstants.KRPANO_TEMPLATE,
        target: "PanoContainer",
        id: "krpano-embed"
      });
    }, 0);
  }

  /**
 * Obtener el estilo de imagen de fondo con la miniatura del panorama
 *
 * @param {TourItem} item
 * @returns
 * @memberof TourItemComponent
 */
  getPanoImage(item: TourItem) {
    let myStyles = {
      "background-image": "url('" + item.thumbnail + "')"
    };
    return myStyles;
  }

}
