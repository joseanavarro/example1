import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { Logger } from "../../providers/logger/logger";

@Component({
  selector: 'area-thumb',
  templateUrl: 'area-thumb.html'
})
export class AreaThumbComponent {
  // Parámetro de entrada al componente
  @Input() area: TourArea;
  @Input() tour: TourItem;

  public logt: string;

  constructor(
    public navCtrl: NavController,
    private logger: Logger
  ) {
    this.logt = "AreaThumbComponent | ";
    let ti = this.logt + "constructor";
    this.logger.debug(ti, "Creado componente");
  }

  /**
     * Visualizar los detalles de la visita virtual
     *
     * @param {TourItem} visit
     * @memberof TourItemComponent
     */
  viewArea(item: TourArea, tour: TourItem, name: string) {
    //--------------------------------------
    // Abrir la página de detalle de visita
    //--------------------------------------

    this.navCtrl.push("MorePanosPage", { area: item, tour: tour, areaname: name });
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
