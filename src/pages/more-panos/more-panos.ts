import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AreaPano } from "../../models/areaPano";
import { TourItem } from "../../models/tourItem";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@IonicPage()
@Component({
  selector: 'page-more-panos',
  templateUrl: 'more-panos.html',
})
export class MorePanosPage {
  public tour: TourItem;
  public data: any;
  public area: number;
  public panos: AreaPano[];
  public logt: string;
  public notLoaded: boolean = true;
  public areaname: string;

  /**
   * Creates an instance of MorePanosPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @memberof MorePanosPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public restApi: RestApiProvider
  ) {
    this.logt = "MorePanosPage | ";
    let ti = this.logt + "constructor";
    // Leer parámetros de entrada
    this.tour = navParams.get("tour");
    this.area = navParams.get("area");
    this.areaname = navParams.get("areaname");
    const that = this;
    // Pedir la lista de panoramas 
    this.restApi.getPanosArea(this.tour.id, this.area).subscribe(res => {
      this.panos = res.Panos;
      this.notLoaded = false;
    }, (err) => {
      this.notLoaded = false;
      this.logger.error(ti, "Error: ", err);
    });
    this.logger.debug(ti, "Creada página de mostrar más panoramas");
  }

  ionViewDidLoad() {
    let ti = this.logt + "ionViewDidLoad";
    this.logger.debug(ti, 'ionViewDidLoad MorePanosPage');
  }

}
