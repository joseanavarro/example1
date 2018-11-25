import { Component, Input } from '@angular/core';
import { App, NavController } from "ionic-angular";
import { FlwProfile } from "../../models/flwProfile";
import { Globals } from "../../providers/globals/globals";

@Component({
  selector: 'flw-item',
  templateUrl: 'flw-item.html'
})
export class FlwItemComponent {
  // Parámetro de entrada al componente
  @Input() item: FlwProfile;

  constructor(
    public navCtrl: NavController,
    private globals: Globals,
    private app: App
  ) {

  }

  /**
   * 
   * 
   * @param {*} item 
   * @returns 
   * @memberof FlwItemComponent
   */
  getFlwAvatar(item: any) {
    // let myStyles = {
    //   "background-image": "url('" + item.avatar + "')"
    // };
    return item.avatar;
  }

  /**
   * 
   * 
   * @param {number} userId 
   * @memberof FlwItemComponent
   */
  photographerProfile(user: number) {
    // Abrir la página de detalle de visita
    this.globals.viewUserId = user;
    this.app.getRootNav().push("UserProfilePage", { item: user });
  }

}
