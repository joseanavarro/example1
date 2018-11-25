import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { geoAddress } from "../../models/geoAddress";
import { AppConstants } from '../../providers/app-constants/app-constants';
import { DatabaseService } from "../../providers/database-service/database-service";
import { GeoProvider } from "../../providers/geo/geo";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-new-tour',
  templateUrl: 'new-tour.html',
})
export class NewTourPage {

  startTourForm: FormGroup;
  logt: string;
  ti: string;
  closeButton: string;
  inputErrorText: string;
  inputErrorTitle: string;
  searching: string;
  searchingLocation: string;
  ErrorTitle: string;
  dbErrorText: string;
  textAddress: geoAddress = new geoAddress();

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public logger: Logger,
    public navParams: NavParams,
    public util: UtilProvider,
    public globals: Globals,
    public db: DatabaseService,
    public translate: TranslateService,
    public ga: GoogleAnalytics,
    public geo: GeoProvider
  ) {
    this.logt = "NewTourPage | ";
    this.ti = this.logt + "constructor";

    this.translate.get("input_error").subscribe(value => this.inputErrorTitle = value);
    this.translate.get("missing_title_desc").subscribe(value => this.inputErrorText = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("looking_location").subscribe(value => this.searchingLocation = value);
    this.translate.get("searching").subscribe(value => this.searching = value);
    this.translate.get("error").subscribe(value => this.ErrorTitle = value);
    this.translate.get("db_error").subscribe(value => this.dbErrorText = value);

    //-----------------------------------------------------
    // Definir formulario con validaciones para cada campo
    //-----------------------------------------------------
    this.startTourForm = formBuilder.group({
      tourTitle: ["", Validators.required],
      description: [""]
    });

  }

  /**
   * Ejecutar cada vez que se  carga la página
   * 
   * @memberof NewTourPage
   */
  ionViewWillEnter() {
    this.ti = this.logt + "ionViewWillEnter";
    if (this.globals.cfgGetLocation) {
      // El usuario quiere obtener la localización del tour
      this.geo.findLocation()
        .then((loc) => {
          this.globals.lat = loc.latitude;
          this.globals.lon = loc.longitude;
          this.globals.alt = loc.altitude;
          this.ga.trackEvent(AppConstants.SC_LOCATION, "found", loc.toString());
          this.logger.debug(this.ti, "Obtenida localización");
        })
        .catch((error) => {
          this.textAddress = this.geo.setLocationUnknown();
          // No se puede obtener la localización, mostrar mensaje de error
          this.ga.trackEvent(AppConstants.SC_LOCATION, "not found");
          this.logger.debug(this.ti, "No se puede obtener la localización, mostrar mensaje de error: ", error);
        })
    }
  }

  /**
  * Comprueba si un formulario es válido
  *
  * @param {FormGroup} aForm
  * @memberof NewTourPage
  */
  formValid(aForm: FormGroup): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (aForm.valid) {
        resolve();
      } else {
        reject();
      }
    });
  }

  /**
   * Iniciar un tour nuevo
   * 
   * @memberof NewTourPage
   */
  startNewTour() {
    this.ti = this.logt + "startNewTour";

    this.formValid(this.startTourForm)
      .then(() => {

        // Leer la identidad del último tour realizado
        this.db.getLastTour()
          .then(
            (result) => {
              if (result === undefined || result === null) {
                this.globals.tourNum = 0;
              } else {
                this.globals.tourNum = result.tourid;
              }
              this.logger.debug(this.ti, 'Id de tour obtenida de DB = ' + this.globals.tourNum.toString());
              this.globals.tourNum += 1;

              // Agregar registro de Tour en la base de datos
              this.db.addTour(this.globals.tourNum, 0, this.startTourForm.value.tourTitle,
                '', this.globals.lat, this.globals.lon, AppConstants.TOUR_CREATING, '')
                .then(
                  () => {
                    this.db.addTourData(this.globals.tourNum, this.startTourForm.value.tourTitle,
                      this.startTourForm.value.description, this.globals.lat, this.globals.lon,
                      this.textAddress.street, this.textAddress.postalCode, this.textAddress.City,
                      this.textAddress.Country)
                      .then(
                        () => {
                          this.globals.tourTitle = this.startTourForm.value.tourTitle;
                          // Saltar a la página e creación de nuevo panorama
                          this.navCtrl.push("NewPanoPage", { panoId: 1 });
                        },
                        (err) => {
                          this.logger.error(this.ti, "Error al crear registro en TourData", JSON.stringify(err));
                          this.util.presentAlert(this.ErrorTitle, this.dbErrorText, this.closeButton);
                        });
                  },
                  (err) => {
                    this.logger.error(this.ti, "Error al crear registro en Tours", JSON.stringify(err));
                    this.util.presentAlert(this.ErrorTitle, this.dbErrorText, this.closeButton);
                  });
            },
            (err) => {
              this.logger.error(this.ti, "Error en la base de datos", JSON.stringify(err));
              this.util.presentAlert(this.ErrorTitle, this.dbErrorText, this.closeButton);
            });
      },
        (err) => {
          this.logger.debug(this.ti, "Formulario NO válido");
          this.util.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
        });
  }

}
