import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

@Component({
  selector: 'near-header',
  templateUrl: 'near-header.html'
})
export class NearHeaderComponent {
  @Input() active: number;
  @Input() title: string;

  constructor(public navCtrl: NavController) {
  }

  /**
   * Ejecutar la acción correspondientemal elemento según esté activo o no
   * 
   * @param {number} item 
   * @memberof NearHeaderComponent
   */
  clickAction(item: number) {
    if (this.active === item) {
      // No hacer nada, el elemento ya se muestra
    } else {
      switch (item) {
        case 1:
          // Abrir mapa
          this.navCtrl.setRoot("NearMapPage", { title: this.title });
          break;

        case 2:
          // Abrir lista
          this.navCtrl.setRoot("NearListPage", { title: this.title });
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
