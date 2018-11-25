import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";
import { AreaPano } from "../../models/areaPano";
import { TourItem } from "../../models/tourItem";

@Component({
  selector: 'edit-tour-thumb',
  templateUrl: 'edit-tour-thumb.html'
})
export class EditTourThumbComponent {
  // Parámetro de entrada al componente
  @Input() pano: AreaPano;
  @Input() tour: TourItem;
  @Input() areaname: string;
  @Input() connect1: string;

  text: string;

  constructor(
    public navCtrl: NavController
  ) {
    //console.log(' TourThumbComponent: ' + this.item.id_pano);
  }

  /**
 * Obtener el estilo de imagen de fondo con la miniatura del área
 *
 * @param {TourItem} item
 * @returns
 * @memberof TourItemComponent
 */
  getPanoImage(item: AreaPano) {
    let myStyles = {
      "background-image": "url('" + item.thumbnail + "')"
    };
    return myStyles;
  }

  /**
  * Visualizar los detalles de la visita virtual
  *
  * @param {AreaPano} pano
  * @param {TourItem} tour
  * @param {string} [connect1=""]  Identidad de panorama para conectar
  * @memberof EditTourThumbComponent
  */
  edit(pano: AreaPano, tour: TourItem, connect1: string = "") {
    if (connect1 !== "") {
      // Abrir la página de detalle de visita
      // Visit lleva el nombre del panorama
      this.navCtrl.push("ConnectArrowsPage", { command: 1, tour: this.tour, c1: connect1, c2: pano.id_pano });
    } else {
      // Abrir la página de detalle de visita
      // Visit lleva el nombre del panorama
      this.navCtrl.push("EditPanoPage", { pano: pano, tour: tour });
    }
  }

}

