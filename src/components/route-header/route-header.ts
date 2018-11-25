import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { RouteItem } from "../../models/routeItem";

@Component({
  selector: 'route-header',
  templateUrl: 'route-header.html'
})
export class RouteHeaderComponent {
  @Input() active: number;
  @Input() route: RouteItem;

  constructor(public navCtrl: NavController) {
  }

  /**
 * Ejecutar la acción correspondientemal elemento según esté activo o no
 * 
 * @param {number} item 
 * @memberof NearHeaderComponent
 */
  clickAction(sel: number, route: RouteItem) {
    if (this.active === sel) {
      // No hacer nada, el elemento ya se muestra
    } else {
      switch (sel) {
        case 1:
          // Abrir mapa
          this.navCtrl.setRoot("RouteDetailPage", { item: route });
          break;

        case 2:
          // Abrir lista
          this.navCtrl.setRoot("RouteMapPage", { item: route });
          break;

        case 3:
          // Abrir lista
          this.navCtrl.setRoot("RouteListPage", { item: route });
          break;

        default:
          break;
      }
    }

  }

  /**
   * Devolver la clase que se aplica al elemento
   * 
   * @param {number} item 
   * @returns 
   * @memberof NearHeaderComponent
   */
  getClass(item: number) {
    if (this.active === item) {
      return "grid-column-active";
    } else {
      return "grid-column-pasive";
    }
  }

}
