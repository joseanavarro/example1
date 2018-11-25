import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { AppConstants } from '../../providers/app-constants/app-constants';

@IonicPage()
@Component({
  selector: 'page-show-error',
  templateUrl: 'show-error.html',
})
export class ShowErrorPage {

  public errorMsg: string;
  public errorMsg2: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService
  ) {

  }

  ionViewDidLoad() {
  }

  /**
   * Ejecutar cada vez que se carga la página
   * 
   * @memberof ShowErrorPage
   */
  ionViewWillEnter() {

    let errorType = this.navParams.get("type");

    switch (errorType) {

      case AppConstants.ERROR_NO_NEAR_PANOS:
        // Mostrar error de panoramas cercanos no encontrados
        this.translate.get("no_near_tours_desc").subscribe(value => this.errorMsg = value.replace("$rad$", AppConstants.GEO_KM_RAD_MAX.toString()));
        this.translate.get("no_near_tours_desc2").subscribe(value => this.errorMsg2 = value);
        break;

      default:
        this.translate.get("err_location").subscribe(value => this.errorMsg = value);
        this.translate.get("err_location_desc").subscribe(value => this.errorMsg2 = value);
        break;
    }
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
