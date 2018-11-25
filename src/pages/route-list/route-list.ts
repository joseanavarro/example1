import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { RouteItem } from "../../models/routeItem";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@IonicPage()
@Component({
  selector: 'page-route-list',
  templateUrl: 'route-list.html',
})
export class RouteListPage {
  public route: RouteItem;
  logt: string;
  ti: string;
  tours: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public globals: Globals,
    public restApi: RestApiProvider
  ) {
    this.route = this.navParams.get("item");
    this.ga.trackView('RouteListPage');

    this.route = this.navParams.get("item");
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.ga.trackView('NearListPage');

    this.restApi.getGeoTours(this.route.lat,
      this.route.lon, false).subscribe(res => {
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
