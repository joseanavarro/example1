import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { Logger } from "../../providers/logger/logger";

@Component({
  selector: 'edit-area-thumb',
  templateUrl: 'edit-area-thumb.html'
})
export class EditAreaThumbComponent {
  // Parámetro de entrada al componente
  @Input() area: TourArea;
  @Input() tour: TourItem;
  @Input() connect1: string;

  public logt: string;
  public viewdelete: boolean;

  constructor(
    public navCtrl: NavController,
    private logger: Logger
  ) {
    this.logt = "EditAreaThumbComponent | ";
    let ti = this.logt + "constructor";
    this.logger.debug(ti, "Creado componente");

    // if (this.area.id_area === "0" || this.area.id_area === "-1") {
    //   this.viewdelete = false;
    // } else {
    //   this.viewdelete = true;
    // }
  }

  /**
     * Visualizar los detalles de la visita virtual
     *
     * @param {TourItem} visit
     * @memberof TourItemComponent
     */
  viewArea(item: TourArea, tour: TourItem, name: string, connect1: string = "") {
    if (connect1 !== "") {
      // Abrir la página de detalle de visita
      // Visit lleva el nombre del panorama
      this.navCtrl.push("EditArrows2Page", { area: item, tour: tour, connect1: connect1 });
    } else {
      // Abrir la página de detalle de visita
      // Visit lleva el nombre del panorama
      this.navCtrl.push("EditMorePanosPage", { area: item, tour: tour, areaname: name });
    }
  }

  /**
   * Obtener el estilo de imagen de fondo con la miniatura del área
   *
   * @param {TourItem} item
   * @returns
   * @memberof TourItemComponent
   */
  getAreaImage(item: TourArea) {
    let myStyles = {
      "background-image": "url('" + item.thumbnail + "')"
    };
    return myStyles;
  }

}
