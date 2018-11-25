import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Logger } from "../../providers/logger/logger";
import { GeoProvider } from "../../providers/geo/geo";
import { UtilProvider } from "../../providers/util/util";
import { LoadingController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { AppConstants } from '../../providers/app-constants/app-constants';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Globals } from "../../providers/globals/globals";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  search1Form: FormGroup;
  logt: string;
  ti: string;
  searchType: boolean;
  latitude: string;
  longitude: string;
  loadingText: string;
  inputErrorTitle: string;
  inputErrorText: string;
  closeButton: string;
  httpErrorTitle: string;
  httpErrorText: string;
  internalErrorTitle: string;
  internalErrorText: string;
  errorText: string;
  public erroType: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public logger: Logger,
    public geo: GeoProvider,
    public util: UtilProvider,
    public translate: TranslateService,
    public loading: LoadingController,
    public ga: GoogleAnalytics,
    public restApi: RestApiProvider,
    public globals: Globals
  ) {
    this.logt = "Página de búsqueda | ";
    this.ti = this.logt + "constructor";

    this.searchType = true;

    this.translate.get("input_error_desc").subscribe(value => {
      this.inputErrorText = value;
    });
    this.translate.get("close_button").subscribe(value => {
      this.closeButton = value;
    });
    this.translate.get("http_error").subscribe(value => {
      this.httpErrorTitle = value;
    });
    this.translate.get("http_error_desc").subscribe(value => {
      this.httpErrorText = value;
    });
    this.translate.get("internal_error").subscribe(value => {
      this.internalErrorTitle = value;
    });
    this.translate.get("internal_error_desc").subscribe(value => {
      this.internalErrorText = value;
    });
    //-----------------------------------------------------
    // Definir formulario con validaciones para cada campo
    //-----------------------------------------------------
    this.search1Form = formBuilder.group({
      searchInput: ["", Validators.required]
    });

  }

  ionViewDidLoad() {
    this.ga.trackView('SearchPage');
  }

  /**
   * Comprueba si un formulario es válido
   *
   * @param {FormGroup} aForm
   * @memberof LoginPage
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
   * Realizar búsqueda de dirección
   * 
   * @memberof SearchPage
   */
  search1() {
    this.ti = this.logt + "search1";

    // this.search1Form.value.searchInput
    // Contiene el texto de búsqueda
    let text = this.search1Form.value.searchInput;
    this.logger.debug(this.ti, text);
    this.logger.debug(this.ti, this.searchType);

    this.formValid(this.search1Form)
      .then(() => {
        this.logger.debug(this.ti, "Formulario válido");
        //-----------------------------
        // Mostrar indicador de espera
        //-----------------------------
        let loading = this.loading.create({
          content: this.loadingText
        });
        loading.present();

        if (this.searchType) {
          // Search by text
          this.navCtrl.push("SearchListPage", { search: text });
          loading.dismiss();
        } else {
          // Search by address
          this.geo.geoCoding(text).then(
            data => {
              this.logger.trace(this.ti, "Coordenadas obtenidas", data.toString());
              this.ga.trackEvent(AppConstants.SC_LOCATION, "found", data.toString());
              this.globals.location = data;

              //Encontrada localización, buscamos los tours por latitud/longitud
              this.restApi.getGeoTours(this.globals.location.latitude,
                this.globals.location.longitude, true).subscribe(res => {
                  //  Saltamos a la siguiente página
                  if (res.totalItems > 0) {
                    this.navCtrl.push("NearListPage", { title: text });
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
                  this.erroType = AppConstants.ERROR_CONNECTION;
                  this.navCtrl.push("ShowErrorPage", { type: this.erroType });
                });
              loading.dismiss();
            },
            err => {
              this.logger.debug(this.ti, "Error: ", err);
              loading.dismiss();
            }
          );
        }
      })
      .catch(() => {
        //--------------------------------------------------------
        // Los datos introducidos en el formulario no son válidos
        //--------------------------------------------------------
        this.logger.debug(this.ti, "Formulario NO válido");
        this.util.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
      });
  }

}
