import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { RouteItem } from "../../models/routeItem";

@IonicPage()
@Component({
  selector: 'page-route-detail',
  templateUrl: 'route-detail.html',
})
export class RouteDetailPage {
  public route: RouteItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ga: GoogleAnalytics
  ) {
    this.route = this.navParams.get("item");
    this.ga.trackView('RouteDetailPage');
  }

  ionViewDidLoad() {
  }

  /**
  * It’s fired when entering a page, before it becomes the active one. 
  * Use it for tasks you want to do every time you enter in the view 
  * (setting event listeners, updating a table, etc.).
  * 
  * @memberof UserProfilePage
  */
  ionViewWillEnter() {


  }

  /**
   * Devolver estilo (se devuelve la foto como fondo de un div)
   * 
   * @param {RouteItem} item 
   * @returns 
   * @memberof RouteItemComponent
   */
  getStyle(item: RouteItem) {
    let myStyles = {
      "background-image": "url('" + item.thumbnail + "')"
    };
    return myStyles;
  }

}
