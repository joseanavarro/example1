import { Component, ElementRef } from '@angular/core';
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { TourItem } from "../../models/tourItem";
import { Globals } from "../../providers/globals/globals";
//import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-detail-map',
  templateUrl: 'detail-map.html',
})
export class DetailMapPage {
  public tour: TourItem;
  tours: TourItem[];
  logt: string;
  ti: string;

  /**
  * Creates an instance of DetailMapPage.
  * @param {Logger} logger 
  * @param {NavController} navCtrl 
  * @param {NavParams} navParams 
  * @param {ElementRef} elementRef 
  * @param {RestApiProvider} restApi 
  * @param {UtilProvider} util 
  * @param {Globals} globals 
  * @param {Http} http 
  * @memberof DetailMapPage
  */
  constructor(
    //private logger: Logger,
    public navCtrl: NavController,
    public navParams: NavParams,
    public elementRef: ElementRef,
    public restApi: RestApiProvider,
    public util: UtilProvider,
    public globals: Globals,
    public http: Http,
    public loadingCtrl: LoadingController,
    public translate: TranslateService
  ) {
    this.logt = "DetailMapPage | ";
    this.ti = this.logt + "constructor";
    this.tour = navParams.get("item");
  }

}
