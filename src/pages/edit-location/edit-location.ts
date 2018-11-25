import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourData } from '../../models/tourData';
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { DatabaseService } from "../../providers/database-service/database-service";
import { GeoProvider } from "../../providers/geo/geo";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { PlatformProvider } from '../../providers/platform/platform';
import { ShareLocationProvider } from '../../providers/share-location/share-location';
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-edit-location',
  templateUrl: 'edit-location.html',
})
export class EditLocationPage {
  public tour: TourData;
  public tour0: TourItem;
  tours: TourItem[];
  logt: string;
  ti: string;
  newLocation: TourData = new TourData();
  locChanged: boolean;
  closeButton: string;
  updated_data: string;
  updated_data_desc: string;
  update_error: string;
  update_error_text: string;
  latitude: string;
  longitude: string;
  tourid: number;
  title: string;
  description: string;
  searchTerm: string;
  searching: string;
  searchingLocation: string;
  editDesc: string;
  local: boolean;
  panoId: number;

  constructor(
    private logger: Logger,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseService,
    public util: UtilProvider,
    public translate: TranslateService,
    public geo: GeoProvider,
    public ga: GoogleAnalytics,
    public shareLoc: ShareLocationProvider,
    public plt: PlatformProvider,
    public loading: LoadingProvider
  ) {
    this.logt = "EditLocationPage | ";
    this.ti = this.logt + "constructor";

    this.local = this.navParams.get("local");
    if (this.local) {
      this.tour = this.navParams.get("item");
      this.tourid = this.tour.tourid;
      this.latitude = this.tour.lat;
      this.longitude = this.tour.lon;
      this.title = this.tour.title;
      this.description = this.tour.description;
    } else {
      this.tour0 = this.navParams.get("item");
      this.tourid = Number(this.tour0.id);
      this.latitude = this.tour0.lat.toString();
      this.longitude = this.tour0.lon.toString();
      this.title = this.tour0.title;
      this.description = this.tour0.description;
    }

    this.panoId = this.navParams.get("panoId");


    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("updated_data").subscribe(value => this.updated_data = value);
    this.translate.get("updated_data_desc").subscribe(value => this.updated_data_desc = value);
    this.translate.get("error").subscribe(value => this.update_error = value);
    this.translate.get("db_error").subscribe(value => this.update_error_text = value);
    this.translate.get("looking_location").subscribe(value => this.searchingLocation = value);
    this.translate.get("searching").subscribe(value => this.searching = value);
    this.translate.get("edit_map_desc").subscribe(value => this.editDesc = value);

    // Mostrar ventana de ayuda
    this.util.presentAlert("", this.editDesc, this.closeButton);
  }

  ionViewWillEnter() {
    this.locChanged = false;
  }

  /**
   * Guardar la nueva localización
   * 
   * @memberof EditLocationPage
   */
  setLocation() {
    this.ti = this.logt + "setLocation";

    if (this.local) {
      // Guardar datos a nivel local
      if (this.locChanged) {
        // Guardar los datos en la tabla
        this.db.UpdateTourData(this.tourid, this.title, this.description,
          this.newLocation.lat, this.newLocation.lon, this.newLocation.street, this.newLocation.postal_code,
          this.newLocation.city, this.newLocation.country)
          .then((result) => {
            this.logger.debug(this.ti, 'Guardado TourData');
            this.shareLoc.sendData(this.newLocation);
            this.util.presentAlert(this.updated_data, this.updated_data_desc, this.closeButton);
          }, (err) => {
            this.logger.error(this.ti, 'Error guardando TourData: ' + err);
            this.util.presentAlert(this.update_error, this.update_error_text, this.closeButton);
          });
      }
    }
    else {
      this.shareLoc.sendData(this.newLocation);
      // Guardar datos en el servidor
      this.plt.updateLocation(
        this.tourid,
        null,
        this.newLocation.lat,
        this.newLocation.lon,
        this.newLocation.country,
        this.newLocation.city,
        this.newLocation.description
      ).then((result) => {
        this.logger.debug(this.ti, 'Guardada ubicación en el servidor');
        this.util.presentAlert(this.updated_data, this.updated_data_desc, this.closeButton);
      }, (err) => {
        this.logger.error(this.ti, 'Error guardando ubicación en el servidor: ' + err);
        this.util.presentAlert(this.update_error, this.update_error_text, this.closeButton);
      });
    }

  }

  /**
   * Evento que recoge los datos de centro del mapa desde el componente map
   * 
   * @param {TourData} newLoc 
   * @memberof EditLocationPage
   */
  getNewLocation(newLoc: TourData) {
    this.ti = this.logt + "getNewLocation";

    this.locChanged = true;
    this.newLocation = newLoc;
    this.logger.debug(this.ti, "Evento recibido", newLoc.description);
  }

  /**
   * Buscar dirección
   * 
   * @memberof EditLocationPage
   */
  searchAddress() {
    this.loading.presentLoader(this.searchingLocation, 10)
    // Search by address
    this.geo.geoCoding(this.searchTerm).then(
      data => {
        this.logger.trace(this.ti, "Coordenadas obtenidas", data.toString());
        this.ga.trackEvent(AppConstants.SC_LOCATION, "found", data.toString());
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        //Encontrada localización, el mapa se coloca en la nueva posición

        this.loading.presentLoader('', 0);;
      },
      err => {
        this.logger.debug(this.ti, "Error: ", err);
        this.loading.presentLoader('', 0);;
      }
    );
  }

}
