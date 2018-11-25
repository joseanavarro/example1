import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { Globals } from "../../providers/globals/globals";

@Component({
  selector: 'myphotos-header',
  templateUrl: 'myphotos-header.html'
})
export class MyphotosHeaderComponent {
  @Input() active: number;

  constructor(
    public globals: Globals,
    public navCtrl: NavController
  ) {
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
          // Abrir información de usuario
          this.navCtrl.setRoot("MyPhotosPage");
          break;

        case 2:
          // Abrir publicaciones de usuario
          this.navCtrl.setRoot("MyPublishedPhotosPage");
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
