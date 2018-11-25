import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { Globals } from "../../providers/globals/globals";

@Component({
  selector: 'user-header',
  templateUrl: 'user-header.html'
})
export class UserHeaderComponent {
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
          this.navCtrl.setRoot("UserProfilePage", { item: this.globals.viewUserId });
          break;

        case 2:
          // Abrir publicaciones de usuario
          this.navCtrl.setRoot("UserProfilePublicationsPage");
          break;

        case 3:
          // Abrir seguidores del usuario
          this.navCtrl.setRoot("UserProfileFollowersPage");
          break;

        case 4:
          // Abrir seguidos por el usuario
          this.navCtrl.setRoot("UserProfileFollowingPage");
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
