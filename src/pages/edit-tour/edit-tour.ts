import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from '../../providers/app-constants/app-constants';
import { GeoProvider } from "../../providers/geo/geo";
import { Globals } from "../../providers/globals/globals";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { PlatformProvider } from '../../providers/platform/platform';
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { ShareLocationProvider } from '../../providers/share-location/share-location';
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-edit-tour',
  templateUrl: 'edit-tour.html',
})
export class EditTourPage {

  logt: string;
  ti: string;
  public tour: TourItem;
  tour_areas: TourArea[];
  address: string;
  city: string;
  country: string;
  location: string;
  lat: number;
  lon: number;
  morePanos: boolean;
  moreAreas: boolean;
  numAreas: number;
  more_panos: TourItem[];
  pubhide: boolean = false;

  txtUpdateError: string;
  txtUpdateError_text: string;
  txtUpdatedData: string;
  txtUpdatedData_desc: string;
  txtCloseButton: string;
  txtConfirmDelTour: string;
  deleteTourTxt: string;
  txtWait: string;
  txtWorking: string;
  txtTourDeleted: string;
  txtTourDeleted_desc: string;
  txtDelTourError: string
  txtDelTourError_desc: string;
  txtHidden: string;
  txtAcceptButton: string;
  txtCancelButton: string;
  txtPubhide: string;
  txtPubhide1: string;
  txtPubhide2: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public logger: Logger,
    public plt: PlatformProvider,
    public util: UtilProvider,
    public shareLoc: ShareLocationProvider,
    public globals: Globals,
    public geo: GeoProvider,
    public restApi: RestApiProvider,
    public dialogs: Dialogs,
    public loading: LoadingProvider
  ) {
    this.logt = "EditTourPage | ";
    this.ti = this.logt + "constructor";

    this.tour = navParams.get("item");
    this.logger.trace(this.ti, "this.tour: ", JSON.stringify(this.tour))

    this.translate.get("updated_data").subscribe(value => this.txtUpdatedData = value);
    this.translate.get("updated_data_desc").subscribe(value => this.txtUpdatedData_desc = value);
    this.translate.get("error").subscribe(value => this.txtUpdateError = value);
    this.translate.get("db_error").subscribe(value => this.txtUpdateError_text = value);
    this.translate.get("close_button").subscribe(value => this.txtCloseButton = value);
    this.translate.get("delete_tour_confirm").subscribe(value => this.txtConfirmDelTour = value);
    this.translate.get("delete_tour").subscribe(value => this.deleteTourTxt = value);
    this.translate.get("wait").subscribe(value => this.txtWait = value);
    this.translate.get("working").subscribe(value => this.txtWorking = value);
    this.translate.get("tour_deleted").subscribe(value => this.txtTourDeleted = value);
    this.translate.get("tour_deleted_desc").subscribe(value => this.txtTourDeleted_desc = value);
    this.translate.get("err_tour_deleted").subscribe(value => this.txtDelTourError = value);
    this.translate.get("err_tour_deleted_desc").subscribe(value => this.txtDelTourError_desc = value);
    this.translate.get("hidden").subscribe(value => this.txtHidden = value);
    this.translate.get("cancel").subscribe(value => this.txtCancelButton = value);
    this.translate.get("accept").subscribe(value => this.txtAcceptButton = value);
    this.translate.get("hide_in_portal").subscribe(value => this.txtPubhide1 = value);
    this.translate.get("publish_in_portal").subscribe(value => this.txtPubhide2 = value);

    this.checkMorePanos();
    if (this.globals.cfgGetLocation) {
      this.getLocationData();
    }
    this.getPubHide();

    // Evento de cambio de cambio de datos de localización
    // actualizamos la variable 'location' con el valor recibido
    shareLoc.valueChanged.subscribe(
      (value) => {
        this.location = value.description;
        this.tour.lat = value.lat;
        this.tour.lon = value.lon;
      });
  }

  ionViewDidLoad() {

  }

  /**
  * Editar título del panorama
  *
  * @memberof EditTourPage
  */
  editTexts() {
    this.ti = this.logt + "getLocationData";
    this.logger.debug(this.ti, 'Entrada');

    this.plt.updateTextFields(
      this.tour.id,
      null,
      this.tour.title,
      null,
      this.tour.description,
      null
    ).then((result) => {
      this.logger.debug(this.ti, 'Campo de texto actualizado en el servidor');
      this.util.presentAlert(this.txtUpdatedData, this.txtUpdatedData_desc, this.txtCloseButton);
    }, (err) => {
      this.logger.error(this.ti, 'Error guardando Campo de texto en el servidor: ' + err);
      this.util.presentAlert(this.txtUpdateError, this.txtUpdateError_text, this.txtCloseButton);
    });
  }

  /**
  * Determinar si el tour está como visible en el portal
  *
  * @memberof EditTourPage
  */
  getPubHide() {
    this.ti = this.logt + "getPubHide";
    this.logger.debug(this.ti, 'Entrada');

    this.plt.getPubHide(
      this.tour.id,
      AppConstants.PORTAL_ID
    ).then((result) => {
      if (result) {
        this.pubhide = true;
        this.txtPubhide = this.txtPubhide1;
      } else {
        this.pubhide = false;
        this.txtPubhide = this.txtPubhide2;
      }
    }, (err) => {
      this.logger.error(this.ti, 'Error determinando publicación en portal: ' + err);
    });
  }

  /**
   * Mostrar u ocultar en público
   *
   * @memberof EditTourPage
   */
  pubhideTour() {
    let command: string;
    this.ti = this.logt + "pubhideTour";
    this.logger.debug(this.ti, 'Entrada');

    if (this.pubhide) {
      command = '3';
    } else {
      command = '2';
    }
    this.plt.PubHide(
      command,
      this.tour.id,
      AppConstants.PORTAL_ID
    ).then((result) => {
      if (result != 0) {
        this.pubhide = !this.pubhide;
        if (this.pubhide) {
          this.translate.get("publish_in_portal").subscribe(value => this.txtPubhide = value);
          this.util.presentAlert(this.txtUpdatedData, this.txtUpdatedData_desc, this.txtCloseButton);
        } else {
          this.translate.get("hide_in_portal").subscribe(value => this.txtPubhide = value);
          this.util.presentAlert(this.txtUpdatedData, this.txtUpdatedData_desc, this.txtCloseButton);
        }
        // Saltar N páginas hacia atrás
        let N: number = 1;
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
      }
    }, (err) => {
      this.logger.error(this.ti, 'Error determinando publicación en portal: ' + err);
      this.util.presentAlert(this.txtUpdateError, this.txtUpdateError_text, this.txtCloseButton);
    });
  }

  /**
  * Abrir la página de editar dirección
  * 
  * @memberof EditTourPage
  */
  goMap() {
    // Le pasamos en el parámetro todos los datos disponibles del tour
    this.navCtrl.push("EditLocationPage", { item: this.tour, local: false, panoId: null });
  }

  /**
  * Obtener datos de localización
  *
  * @memberof EditTourPage
  */
  getLocationData() {
    this.ti = this.logt + "getLocationData";

    // Obtener los datos de la localización
    //this.getLocationData
    this.address = this.tour.address;
    let street = (this.address === null || this.address === "") ? "" : this.address;
    this.city = this.tour.city;
    let city = (this.city === null || this.city === "") ? "" : ", " + this.city;
    this.country = this.tour.country;
    let country = (this.country === null || this.country === "") ? "" : ", " + this.country;
    this.location = street + city + country;
    this.lat = this.tour.lat;
    this.lon = this.tour.lon;

    if (this.address !== "") {
      this.location = this.address;
    } else {
      if (this.location === "") {
        // Obtener los datos de dirección postal 
        this.geo.reverseGeoCoding(this.lat, this.lon)
          .then((result) => {
            this.location = result.location;
            this.city = result.City;
            this.country = result.Country;
            this.address = result.street;
          })
          .catch((error) => {
            this.logger.error(this.ti, "Error en petición HTTP", JSON.stringify(error));
            this.location = "";
          });
      }
    }
  }

  /**
  * Borrar Tour Virtual
  *
  * @memberof EditTourPage
  */
  deleteTour() {
    this.ti = this.logt + "deleteTour";
    let ctx = this;
    let buttons = [this.txtAcceptButton, this.txtCancelButton];
    ctx.dialogs.confirm(ctx.txtConfirmDelTour, ctx.deleteTourTxt, buttons)
      .then((result) => {
        // result = 1 -> ok
        // result = 2 -> cancel
        ctx.logger.debug(ctx.ti, 'Opción seleccionada: ', result.toString());
        if (result === 1) {
          this.loading.presentLoader(this.txtWorking, 30);
          ctx.plt.removeTour(ctx.tour.id)
            .then(() => {
              this.util.presentAlert(this.txtTourDeleted, this.txtTourDeleted_desc, this.txtCloseButton);
              // Si se borra un tour saltar dos páginas hacia atrás
              let N: number = 2;
              this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
              setTimeout(() => {
                this.loading.presentLoader('', 0);;
              }, 2000);
            }, (err) => {
              this.util.presentAlert(this.txtDelTourError, this.txtDelTourError_desc, this.txtCloseButton);
              ctx.logger.error(ctx.ti, 'Error borrando tour: ' + err);
              this.loading.presentLoader('', 0);;
            });
        } else {
          ctx.logger.debug(ctx.ti, 'Se decide no borrar el tour');
        }
      });
  }

  /**
  * Comprobar si el tour tiene más panoramas
  * 
  * @memberof EditTourPage
  */
  checkMorePanos() {
    this.ti = this.logt + "checkMorePanos";
    let ctx = this;
    ctx.restApi.getAreas(ctx.tour.id).subscribe(res => {
      ctx.tour_areas = res.Elems;
      // Agregar el área -1 para saber si hay panos ocultos
      let hidden: TourArea = {
        description: "",
        id_area: "-1",
        id_visit: ctx.tour_areas[0].id_visit,
        name: this.txtHidden,
        thumbnail: ctx.tour_areas[0].thumbnail,
        panos: []
      }
      ctx.tour_areas.push(hidden);

      ctx.numAreas = res.totalItems;
      if (res.totalItems > 1) {
        // Hay más de una área, entonces hay más panos
        ctx.moreAreas = true;
      } else {
        ctx.moreAreas = false;
        // Sólo hay un área, pedimos los los panos del área para saber si hay más
        ctx.restApi.getPanosArea(ctx.tour.id, 0).subscribe(res2 => {
          ctx.more_panos = res2.Panos;
          res2.numPanos > 1 ? ctx.morePanos = true : ctx.morePanos = false;
        }, (err) => {
          ctx.logger.error(ctx.ti, "Error: ", err);
        });
      }
    }, (err) => {
      ctx.logger.error(ctx.ti, "Error: ", err);
    });
  }

  /**
  * Mostrar la lista de áreas del tour para edición
  * 
  * @param {TourItem} tour 
  * @param {TourArea[]} tour_areas 
  * @memberof EditTourPage
  */
  showAreas(item: TourItem, tour_areas: TourArea[]) {
    this.navCtrl.push("EditAreasPage", { tour: item, areas: tour_areas });
  }

  /**
   * Mostrar más panoramas del tour para edición
   * 
   * @param {TourItem} tour 
   * @memberof EditTourPage
   */
  showMorePanos(item: TourItem) {
    this.navCtrl.push("EditMorePanosPage", { tour: item, area: 0, areaname: "" });
  }

  /**
   * Volver a la página de 'mis fotos'
   *
   * @memberof EditAreasPage
   */
  goBack() {
    this.navCtrl.setRoot("MyPhotosPage");
  }

}
