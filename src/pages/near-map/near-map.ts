import { Component, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TourItem } from "../../models/tourItem";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-near-map',
  templateUrl: 'near-map.html',
})
export class NearMapPage {
  public latitude: number;
  public longitude: number;
  public tour: TourItem;
  tours: TourItem[];
  logt: string;
  ti: string;
  title: string;

  @ViewChild('mapDiv') mapContainer;

  /**
   * Creates an instance of NearMapPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {GoogleAnalytics} ga 
   * @param {Logger} logger 
   * @param {Globals} globals 
   * @param {RestApiProvider} restApi 
   * @param {TranslateService} translate 
   * @param {LoadingController} loadingCtrl 
   * @memberof NearMapPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public util: UtilProvider,
    public globals: Globals,
    public http: Http,
    public restApi: RestApiProvider,
    public translate: TranslateService,
    public loadingCtrl: LoadingController
  ) {
    this.logt = "NearPage | ";
    this.ti = this.logt + "constructor";

    this.latitude = this.globals.location.latitude;
    this.longitude = this.globals.location.longitude;
    // Obtener parámetro de entrada con título de la página
    this.title = navParams.get("title");
    if (this.title === '') {
      this.translate.get("near").subscribe(value => {
        this.title = value;
      });
    }

  }

  /**
   * Ejecutar cada vez que se carga la página
   * 
   * @memberof NearMapPage
   */
  ionViewWillEnter() {
    this.ga.trackView('NearMapPage');
  }

}
