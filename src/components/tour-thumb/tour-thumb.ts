import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";
import { AreaPano } from "../../models/areaPano";
import { TourItem } from "../../models/tourItem";

@Component({
  selector: 'tour-thumb',
  templateUrl: 'tour-thumb.html'
})
export class TourThumbComponent {
  // Parámetro de entrada al componente
  @Input() pano: AreaPano;
  @Input() tour: TourItem;
  @Input() areaname: string;

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
  * @param {TourItem} visit
  * @memberof TourItemComponent
  */
  viewVisit(visit: AreaPano, tour: TourItem, areaname: string) {
    const startIndex = this.navCtrl.getActive().index - 2;
    if (startIndex > 0) {
      this.navCtrl.remove(startIndex, 1);
    }

    // Abrir la página de detalle de visita
    // Visit lleva el nombre del panorama
    this.navCtrl.push("TourDetailPage", { item: visit, tour: tour, areaname: areaname }).then(() => {
    });;

  }

}
