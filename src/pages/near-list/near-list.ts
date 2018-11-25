import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@IonicPage()
@Component({
  selector: 'page-near-list',
  templateUrl: 'near-list.html',
})
export class NearListPage {
  tours: string[];
  logt: string;
  ti: string;
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public globals: Globals,
    public restApi: RestApiProvider,
    public translate: TranslateService
  ) {
    this.logt = "NearPage | ";
    this.ti = this.logt + "constructor";
    // Obtener parámetro de entrada con título de la página
    this.title = navParams.get("title");
    if (this.title === '') {
      this.translate.get("near").subscribe(value => this.title = value);
    }
  }

  ionViewWillEnter() {
    this.ga.trackView('NearListPage');

    this.restApi.getGeoTours(this.globals.location.latitude,
      this.globals.location.longitude, false).subscribe(res => {
        this.logger.trace(this.ti, "Lista de puntos recibida ", JSON.stringify(res));
        //------------------------------------------------------------
        // Cargar tours al crear la página, se cargan desde el cache
        //-----------------------------------------------------------
        this.tours = res.Elems;
        //alert(JSON.stringify(res));
      }, error => {
        // No se puede obtener la lista de tours, mostrar mensaje de error
        this.logger.debug(this.ti, "No se puede obtener la lista de tours, pedirlo de nuevo al servidor: ", error);
        this.restApi.getGeoTours(this.globals.location.latitude,
          this.globals.location.longitude, true).subscribe(res => {
            this.logger.trace(this.ti, "Lista de puntos recibida después de error ", JSON.stringify(res));
            //------------------------------------------------------------
            // Cargar tours al crear la página, se cargan desde el cache
            //-----------------------------------------------------------
            this.tours = res.Elems;
          }, error => {
            // No se puede obtener la lista de tours, mostrar mensaje de error
            this.logger.error(this.ti, "No se puede obtener la lista de tours, mensaje de error ", error);
          });
      });

  }

}
