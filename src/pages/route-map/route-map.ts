import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RouteItem } from "../../models/routeItem";
import { TourItem } from "../../models/tourItem";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";

@IonicPage()
@Component({
  selector: 'page-route-map',
  templateUrl: 'route-map.html',
})
export class RouteMapPage {
  public route: RouteItem;
  tours: TourItem[];
  logt: string;
  ti: string;

  /**
   * Creates an instance of RouteMapPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {GoogleAnalytics} ga 
   * @param {Logger} logger 
   * @param {Globals} globals 
   * @memberof RouteMapPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public globals: Globals,
  ) {
    this.logt = "RouteMapPage | ";
    this.ti = this.logt + "constructor";
    this.route = this.navParams.get("item");
  }

  /**
   * Ejecutar cada vez que se carga la página
   * 
   * @memberof NearMapPage
   */
  ionViewWillEnter() {
    this.ga.trackView('RouteMapPage');
  }

}
