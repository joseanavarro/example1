import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConstants } from '../../providers/app-constants/app-constants';
import { GeoProvider } from '../../providers/geo/geo';
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-near',
  templateUrl: 'near.html'
})
export class NearPage {
  logt: string;
  ti: string;
  public looking: boolean;
  public showError: boolean;
  errorMessage: string;
  public erroType: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public restApi: RestApiProvider,
    public globals: Globals,
    public util: UtilProvider,
    public geo: GeoProvider
  ) {
    this.logt = "NearPage | ";
    this.ti = this.logt + "constructor";
  }

  /**
   * Se ejecuta cada vez que se entra en la página
   * 
   * @memberof NearPage
   */
  ionViewWillEnter() {
    this.ti = this.logt + "ionViewWillEnter";
    this.looking = true;
    this.showError = false;
    this.ga.trackView('NearPage');

    this.geo.findLocation().then((loc) => {
      this.ga.trackEvent(AppConstants.SC_LOCATION, "found", loc.toString());
      this.globals.location = loc;
      this.logger.debug(this.ti, "this.globals.location.latitude : ", this.globals.location.latitude.toString());
      //Encontrada localización, buscamos los tours por latitud/longitud
      this.restApi.getGeoTours(this.globals.location.latitude,
        this.globals.location.longitude, true).subscribe(res => {
          this.looking = false;
          //  Saltamos a la siguiente página
          if (res.totalItems > 0) {
            this.navCtrl.push("NearListPage", { title: '' });
          } else {
            // No hay puntos cercanos, mostrar mensaje de error
            this.ga.trackEvent(AppConstants.SC_CONNECTION, "error");
            this.erroType = AppConstants.ERROR_NO_NEAR_PANOS;
            this.navCtrl.setRoot("ShowErrorPage", { type: this.erroType });
          }
        }, error => {
          // No se puede obtener la lista de tours, mostrar mensaje de error
          this.ga.trackEvent(AppConstants.SC_CONTENTS, "no near tours");
          this.logger.debug(this.ti, "No se puede obtener la lista de tours, mostrar mensaje de error: ", error);
          this.looking = false;
          this.erroType = AppConstants.ERROR_CONNECTION;
          this.navCtrl.push("ShowErrorPage", { type: this.erroType });
        });
    }, (error) => {
      // No se puede obtener la localización, mostrar mensaje de error
      this.ga.trackEvent(AppConstants.SC_LOCATION, "not found");
      this.logger.debug(this.ti, "No se puede obtener la localización, mostrar mensaje de error: ", error);
      this.looking = false;
      this.erroType = AppConstants.ERROR_NO_LOCATION_FOUND;
      this.navCtrl.push("ShowErrorPage", { type: this.erroType });
    })
  }

}
