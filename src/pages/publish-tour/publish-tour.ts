import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { UUID } from 'angular2-uuid';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PubPano } from "../../models/pubPano";
import { PubTour } from "../../models/pubTour";
import { TourData } from "../../models/tourData";
import { AppConstants } from '../../providers/app-constants/app-constants';
import { DatabaseService } from "../../providers/database-service/database-service";
import { EstadoProvider } from "../../providers/estado/estado";
import { GeoProvider } from "../../providers/geo/geo";
import { Globals } from "../../providers/globals/globals";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { PlatformProvider } from "../../providers/platform/platform";
import { ShareLocationProvider } from '../../providers/share-location/share-location';
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-publish-tour',
  templateUrl: 'publish-tour.html',
})
export class PublishTourPage {

  logt: string;
  ti: string;
  tourId: number;
  tour: TourData;
  tourPanos = [];
  pubPanos: PubPano[] = [];
  pubTour: PubTour = new PubTour();
  tourTitle: string;
  description: string;
  location: string;
  lat: any;
  lon: any;
  hideTour: boolean;
  searching: string;
  searchingLocation: string;
  street: string;
  city: string;
  country: string;
  postal_code: string;
  closeButton: string;
  updated_data: string;
  updated_data_desc: string;
  update_error: string;
  update_error_text: string;
  contact_support: string;
  error_txt: string;
  tour_pub_started_desc: string;
  tour_pub_started: string;
  try_later: string;
  desc: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    private globals: Globals,
    public translate: TranslateService,
    public db: DatabaseService,
    public util: UtilProvider,
    public ga: GoogleAnalytics,
    public geo: GeoProvider,
    public platform: PlatformProvider,
    public st: EstadoProvider,
    public shareLoc: ShareLocationProvider,
    public loading: LoadingProvider
  ) {
    this.logt = "PublishTourPage | ";
    this.ti = this.logt + "constructor";

    this.translate.get("looking_location").subscribe(value => this.searchingLocation = value);
    this.translate.get("searching").subscribe(value => this.searching = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("updated_data").subscribe(value => this.updated_data = value);
    this.translate.get("updated_data_desc").subscribe(value => this.updated_data_desc = value);
    this.translate.get("error").subscribe(value => this.update_error = value);
    this.translate.get("db_error").subscribe(value => this.update_error_text = value);
    this.translate.get("contact_support").subscribe(value => this.contact_support = value);
    this.translate.get("error").subscribe(value => this.error_txt = value);
    this.translate.get("tour_pub_started").subscribe(value => this.tour_pub_started = value);
    this.translate.get("tour_pub_generated_desc").subscribe(value => this.tour_pub_started_desc = value);
    this.translate.get("not_possible_try_later").subscribe(value => this.try_later = value);

    // Leer parámetros de entrada - tour seleccionado 
    this.tourId = this.navParams.get("tourId");

    // Cargar datos del tour
    this.loadTourData(this.tourId);
    // Cargar los panoramas del tour
    this.loadTourPanoramas(this.tourId);

    // Evento de cambio de cambio de datos de localización
    // actualizamos la variable 'location' con el valor recibido
    shareLoc.valueChanged.subscribe(
      (value) => {
        this.location = value.description;
        this.tour.lat = value.lat;
        this.tour.lon = value.lon;
      });

  }

  /**
    * It’s fired when entering a page, before it becomes the active one. 
    * Use it for tasks you want to do every time you enter in the view 
    * (setting event listeners, updating a table, etc.).
    * 
    * @memberof AddToursPage
    */
  ionViewWillEnter() {
    // Cargar los panoramas del tour
    this.loadTourPanoramas(this.tourId);

  }

  /**
   * Obtener los datos de un tour
   * 
   * @param {any} tour_id 
   * @memberof AddToursPage
   */
  loadTourData(tour_id) {
    this.ti = this.logt + "loadTourData";
    // Leer tabla TourData
    this.db.getTourData(tour_id)
      .then((result) => {
        this.tour = new TourData();
        this.tour = result;
        this.logger.debug(this.ti, 'TourData: ', this.tour.title);
        this.description = result.description;
        this.tourTitle = result.title;
        // Obtener los datos de la localización
        //this.getLocationData
        this.street = result.street;
        let street = (this.street === null || this.street === "") ? "" : this.street;
        this.city = result.city;
        let city = (this.city === null || this.city === "") ? "" : ", " + this.city;
        this.country = result.country;
        let country = (this.country === null || this.country === "") ? "" : ", " + this.country;
        this.postal_code = result.postal_code;
        this.location = street + city + country;
        this.lat = result.lat;
        this.lon = result.lon;

        if (this.location === "") {
          //this.loading.presentLoader(this.searching, this.searchingLocation, 10);
          // Obtener los datos de dirección postal 
          this.geo.reverseGeoCoding(result.lat, result.lon)
            .then((result) => {
              this.location = result.location;
              this.city = result.City;
              this.country = result.Country;
              this.street = result.street;
              this.postal_code = result.postalCode;
              // Guardar los datos en la tabla
              this.db.UpdateTourData(tour_id, this.tourTitle, this.description,
                this.lat, this.lon, this.street, this.postal_code, this.city, this.country)
                .then((result) => {
                  this.logger.debug(this.ti, 'Guardado TourData');
                  //this.loading.presentLoader('',0);;
                }, (err) => {
                  this.logger.error(this.ti, 'Error guardando TourData: ' + err);
                  //this.loading.presentLoader('',0);;
                });
            })
            .catch((error) => {
              this.logger.error(this.ti, "Error en petición HTTP", JSON.stringify(error));
              this.location = "";
              this.loading.presentLoader('', 0);;
            });
        }
      }, (err) => {
        this.logger.error(this.ti, 'Error leyendo TourData: ' + err);
        this.loading.presentLoader('', 0);;
      });
  }

  /**
   * Editar texto del tour actual
   * 
   * @memberof PublishTourPage
   */
  editTour() {
    this.ti = this.logt + "editTour";
    // Guardar los datos en la tabla
    this.db.UpdateTourData(this.tourId, this.tourTitle, this.description,
      this.lat, this.lon, this.street, this.postal_code, this.city, this.country)
      .then((result) => {
        this.logger.debug(this.ti, 'Guardado TourData');
        // Hay que cambiar también el registro 0 de la tabla Tours
        this.db.UpdateTourTitle(this.tourTitle, this.tourId)
          .then((result) => {
            this.util.presentAlert(this.updated_data, this.updated_data_desc, this.closeButton);
          }, (err) => {
            this.logger.error(this.ti, 'Error guardando Tours: ' + err);
            this.util.presentAlert(this.update_error, this.update_error_text, this.closeButton);
          });
      }, (err) => {
        this.logger.error(this.ti, 'Error guardando TourData: ' + err);
        this.util.presentAlert(this.update_error, this.update_error_text, this.closeButton);
      });
  }

  /**
   * Abrir la página de editar dirección
   * 
   * @memberof PublishTourPage
   */
  goMap() {
    // Le pasamos en el parámetro todos los datos disponibles del tour
    this.navCtrl.push("EditLocationPage", { item: this.tour, local: true, panoId: 0 });
  }

  /**
   * Leer los panoramas de un tour
   * 
   * @memberof PublishTourPage
   */
  loadTourPanoramas(tourId) {
    this.ti = this.logt + "loadTourPanoramas";

    this.db.getPanos(tourId)
      .then((result) => {
        // Convertir el resultado y guardarlo dentro de una array
        this.logger.debug(this.ti, 'Leidos los panoramas del tour');
        let ctx = this;
        ctx.tourPanos.length = 0;
        for (let i = 0; i < result.length; i++) {
          if (result['item'](i).panoid !== 0) {
            ctx.tourPanos.push({
              panoid: result['item'](i).panoid,
              tourid: result['item'](i).tourid,
              name: result['item'](i).name,
              pano: result['item'](i).pano,
              thumb: result['item'](i).thumbnail
            });
          }
        }
      }, (err) => {
        this.logger.error(this.ti, 'Error leyendo panoramas de Tours: ' + err);
      });
  }

  /**
   * Ir a la página de edición de datos de un panorama
   * 
   * @param {any} tourid 
   * @param {any} panoid 
   * @memberof PublishTourPage
   */
  goEditPano(tourid, panoid) {
    this.navCtrl.push("EditLocalPanoPage", { tour_id: tourid, pano_id: panoid });
  }

  /**
   * Publicar un tour
   * 
   * @memberof PublishTourPage
   */
  publishTour() {
    this.ti = this.logt + "publishTour";

    // Generar identidad de tarea de publicación interna
    let taskId = UUID.UUID();

    // Crear registro de inicio de tarea
    this.db.addTask(taskId, '', AppConstants.TSK_INIT_PUB, this.tourId, -1, this.tourTitle, '', '', AppConstants.ST_PENDING)
      .then(() => {
        // Construimos el archivo json que contiene las lista de panos
        // con sus datos para publicación
        this.pubPanos = [];
        this.pubTour.Title = this.tourTitle;
        this.pubTour.Description = this.description;
        this.pubTour.lat = this.lat;
        this.pubTour.lon = this.lon;

        // Rellenar la lista de panoramas
        // La lista está dispomible en 'this.tourPanos'
        let max = this.tourPanos.length;
        for (let i = 0; i < max; i++) {
          if (AppConstants.DEBUG_MODE) {
            this.logger.debug(this.ti, 'this.tourPanos = ', JSON.stringify(this.tourPanos[i]));
          }

          if (this.tourPanos[i].panoid > 0) {
            let panoObj: PubPano = new PubPano();
            this.logger.debug(this.ti, 'pano name = ', this.tourPanos[i].name);
            if (this.tourPanos[i].name === null || this.tourPanos[i].name === "") {
              panoObj.Title = (i).toString();
            } else {
              panoObj.Title = this.tourPanos[i].name;
            }
            panoObj.Position = i;
            panoObj.lat = (typeof this.tourPanos[i].lat !== 'undefined' || this.tourPanos[i].lat !== null) ? this.tourPanos[i].lat : '0';
            panoObj.lon = (typeof this.tourPanos[i].lon !== 'undefined' || this.tourPanos[i].lon !== null) ? this.tourPanos[i].lon : '0';
            this.pubPanos.push(panoObj);
            // Crear registro en la tabla Tasklist
            this.db.addTask(taskId, '', AppConstants.TSK_PANO, this.tourPanos[i].tourid,
              this.tourPanos[i].panoid, this.tourPanos[i].name,
              this.tourPanos[i].pano, this.tourPanos[i].thumb, AppConstants.ST_PENDING)
              .then(() => {
                this.logger.debug(this.ti, 'Creado registro en Tasklist: ', this.tourPanos[i].name);
              }, () => {
                this.logger.error(this.ti, 'Error creando registro en Tasklist: ', this.tourPanos[i].name);
              });
          }
        }
        this.pubTour.panos = this.pubPanos;

        this.pubTour.lat = (typeof this.lat === 'undefined' || this.lat == null) ? '0' : this.lat;
        this.pubTour.lon = (typeof this.lon === 'undefined' || this.lon == null) ? '0' : this.lon;

        if (this.hideTour) {
          this.pubTour.portal_id = 46; //Id portal VTEP360
        } else {
          this.pubTour.portal_id = Number(AppConstants.PORTAL_ID);
        }

        this.pubTour.user_id = this.globals.loggedUser.userid;

        // Datos de dirección postal_code
        this.pubTour.City = this.city;
        this.pubTour.Street = this.street;
        this.pubTour.Country = this.country;
        this.pubTour.Postal_code = this.postal_code;
        this.pubTour.Address = this.location;

        if (AppConstants.DEBUG_MODE) {
          var myJSON = JSON.stringify(this.pubTour);
          this.logger.debug(this.ti, 'json tour = ', myJSON);
        }

        // Iniciar el proceso de publicación del tour
        this.platform.iniPublishTour(taskId, this.pubTour, this.tourId)
          .then(() => {
            this.logger.debug(this.ti, 'Iniciada la tarea de publicación del tour');
            this.loading.presentLoader(this.tour_pub_started_desc, 5);
            // Ir a la página de tareas de publicación
            this.navCtrl.push("PubTasksPage");
          }, (err) => {
            this.logger.error(this.ti, 'Rechazada tarea de subida de fotos');
            this.translate.get(err).subscribe(value => {
              this.desc = value;
              this.util.presentAlert(this.error_txt, this.desc, this.closeButton);
            });
          });
      }, (err) => {
        this.logger.error(this.ti, 'Rechazada tarea de subida de fotos');
        this.translate.get(err).subscribe(value => {
          this.desc = value;
          this.util.presentAlert(this.error_txt, this.desc, this.closeButton);
        });
      });

  }

}

