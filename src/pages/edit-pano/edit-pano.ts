import { Component } from "@angular/core";
import { Dialogs } from '@ionic-native/dialogs';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from "@ngx-translate/core";
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { AreaOrder } from "../../models/areaOrder";
import { AreaPano } from "../../models/areaPano";
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { AreasProvider } from "../../providers/areas/areas";
import { DatabaseService } from "../../providers/database-service/database-service";
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
  selector: 'page-edit-pano',
  templateUrl: 'edit-pano.html',
  providers: [DatabaseService]
})
export class EditPanoPage {

  public pano: AreaPano;
  public tour: TourItem;
  public areaname: string;
  comments: string[];
  tour_areas: TourArea[];
  more_panos: TourItem[];
  panoData: TourArea;
  logt: string;
  ti: string;
  carpet: number;
  showmoreclass: string;
  isLogged: boolean;
  moreComments: boolean;
  public liked: boolean;
  commentText: any;
  txtHttpError: string;
  txtHttpErrorDesc: string;
  txtCloseButton: string;
  txtAuthError: string;
  txtAuthErrorDesc: string;
  optionSelected: any;
  txtShare: string;
  txtReport: string;
  txtCancel: string;
  txtViewShare: string;
  txtInadequate: string;
  txtWrong: string;
  morePanos: boolean;
  numAreas: number;
  extrapano: boolean = false;
  isRoot: boolean = false;
  address: string;
  city: string;
  country: string;
  location: string;
  lat: number;
  lon: number;
  txtUpdatedData: string;
  txtUpdatedData_desc: string;
  txtUpdateError: string;
  txtUpdateError_text: string;
  txtConfirmMessage: string;
  deletePanoTxt: string;
  deleteTourTxt: string;
  txtConfirmDelTour: string;
  txtOptions: string;
  txtTourDeleted: string;
  txtTourDeleted_desc: string;
  txtPanoDeleted: string;
  txtPanoDeleted_desc: string;
  txtDelPanoError: string;
  txtDelPanoError_desc: string;
  txtDelTourError: string
  txtDelTourError_desc: string;
  txtWait: string;
  txtWorking: string;
  txtShowHideCarpet: string;
  txtShowHideCarpet1: string;
  txtShowHideCarpet2: string;
  options: any[] = [];
  selarea: number;
  alist: AreaOrder[];
  areaCount: number;
  txtMoveError: string;
  txtMoveError_desc: string;
  areaId: any;
  txtAcceptButton: string;
  txtCancelButton: string;

  /**
   * Creates an instance of TourDetailPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {Logger} logger 
   * @param {UtilProvider} util 
   * @param {Globals} globals 
   * @param {RestApiProvider} restApi 
   * @param {Insomnia} insomnia 
   * @memberof TourDetailPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public util: UtilProvider,
    private globals: Globals,
    public restApi: RestApiProvider,
    public translate: TranslateService,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public socialSharing: SocialSharing,
    public db: DatabaseService,
    public ga: GoogleAnalytics,
    public geo: GeoProvider,
    public shareLoc: ShareLocationProvider,
    public plt: PlatformProvider,
    public dialogs: Dialogs,
    public arealist: AreasProvider,
    public loading: LoadingProvider
  ) {
    this.logt = "EditPanoPage | ";
    this.ti = this.logt + "constructor";
    // Leer parámetros de entrada
    this.pano = navParams.get("pano");
    this.tour = navParams.get("tour");

    this.logger.trace(this.ti, "this.pano: ", JSON.stringify(this.pano))
    this.logger.trace(this.ti, "this.tour: ", JSON.stringify(this.tour))

    this.logger.debug(this.ti, "Id Tour: ", this.tour.id);

    // Registrar visualización del tour
    if (this.pano.id_pano !== undefined) {
      util.trackview(this.pano.id_pano);
    }

    this.logger.debug(this.ti, "Título Tour: ", this.pano.name);
    this.translate.get("http_error").subscribe(value => this.txtHttpError = value);
    this.translate.get("http_error_desc").subscribe(value => this.txtHttpErrorDesc = value);
    this.translate.get("close_button").subscribe(value => this.txtCloseButton = value);
    this.translate.get("user_error").subscribe(value => this.txtAuthError = value);
    this.translate.get("must_login_first").subscribe(value => this.txtAuthErrorDesc = value);
    this.translate.get("share").subscribe(value => this.txtShare = value);
    this.translate.get("cancel").subscribe(value => this.txtCancel = value);
    this.translate.get("view_share").subscribe(value => this.txtViewShare = value);
    this.translate.get("report_content").subscribe(value => this.txtReport = value);
    this.translate.get("inadequate_content").subscribe(value => this.txtInadequate = value);
    this.translate.get("wrong_content").subscribe(value => this.txtWrong = value);
    this.translate.get("updated_data").subscribe(value => this.txtUpdatedData = value);
    this.translate.get("updated_data_desc").subscribe(value => this.txtUpdatedData_desc = value);
    this.translate.get("error").subscribe(value => this.txtUpdateError = value);
    this.translate.get("db_error").subscribe(value => this.txtUpdateError_text = value);
    this.translate.get("delete_scene").subscribe(value => this.deletePanoTxt = value);
    this.translate.get("delete_scene_confirm").subscribe(value => this.txtConfirmMessage = value);
    this.translate.get("delete_tour").subscribe(value => this.deleteTourTxt = value);
    this.translate.get("delete_tour_confirm").subscribe(value => this.txtConfirmDelTour = value);
    this.translate.get("edit_options").subscribe(value => this.txtOptions = value);
    this.translate.get("tour_deleted").subscribe(value => this.txtTourDeleted = value);
    this.translate.get("tour_deleted_desc").subscribe(value => this.txtTourDeleted_desc = value);
    this.translate.get("pano_deleted").subscribe(value => this.txtPanoDeleted = value);
    this.translate.get("pano_deleted_desc").subscribe(value => this.txtPanoDeleted_desc = value);
    this.translate.get("err_pano_deleted").subscribe(value => this.txtDelPanoError = value);
    this.translate.get("err_pano_deleted_desc").subscribe(value => this.txtDelPanoError_desc = value);
    this.translate.get("err_tour_deleted").subscribe(value => this.txtDelTourError = value);
    this.translate.get("err_tour_deleted_desc").subscribe(value => this.txtDelTourError_desc = value);
    this.translate.get("wait").subscribe(value => this.txtWait = value);
    this.translate.get("working").subscribe(value => this.txtWorking = value);
    this.translate.get("move_error").subscribe(value => this.txtMoveError = value);
    this.translate.get("move_error_desc").subscribe(value => this.txtMoveError_desc = value);
    this.translate.get("cancel").subscribe(value => this.txtCancelButton = value);
    this.translate.get("accept").subscribe(value => this.txtAcceptButton = value);
    this.translate.get("show_carpet").subscribe(value => this.txtShowHideCarpet1 = value);
    this.translate.get("hide_carpet").subscribe(value => this.txtShowHideCarpet2 = value);

    // Obtener el número de áreas de la visita actual
    this.areaCount = this.arealist.getAreasCount();

    // Obtener el valor de la alfombra (Num12, 0-no, 1-si)
    this.getCarpetValue()
      .then(() => {
        if (this.carpet) {
          this.txtShowHideCarpet = this.txtShowHideCarpet1;
        } else {
          this.txtShowHideCarpet = this.txtShowHideCarpet2;
        }
      });
    // Rellenar el desplegable con los nombres e identidades de área
    this.arealist.getAreaList(this.tour.id, this.pano.id_pano, true)
      .then((are) => {
        for (let i = 0; i < are.length; i++) {
          this.options.push({ value: are[i].id, text: are[i].area, selected: are[i].sel });
          if (are[i].sel) {
            this.areaId = are[i].id;
          }
        }
      });

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
   * @memberof TourDetailPage
   */
  ionViewWillEnter() {
    this.isLogged = this.globals.isLogged;
    // Cargar los comentarios
    this.ga.trackView('EditPanoPage');
  }

  /**
   * Obtener datos de localización
   *
   * @memberof EditPanoPage
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

  /**
   * Obtener el estilo de imagen de fondo con la miniatura del panorama
   *
   * @param {TourItem} item
   * @returns
   * @memberof TourItemComponent
   */
  getPanoImage(item: TourItem) {
    let myStyles = {
      "background-image": "url('" + item.thumbnail + "')"
    };
    return myStyles;
  }

  /**
   * Abrir la página de editar dirección
   * 
   * @memberof PublishTourPage
   */
  goMap() {
    // Le pasamos en el parámetro todos los datos disponibles del tour
    this.navCtrl.push("EditLocationPage", { item: this.tour, local: false, panoId: this.pano.id_pano });
  }

  /**
   * Editar título del panorama
   *
   * @memberof EditPanoPage
   */
  editTexts() {
    this.ti = this.logt + "getLocationData";
    this.logger.debug(this.ti, 'Entrada');

    this.plt.updateTextFields(
      this.tour.id,
      this.pano.id_pano,
      this.tour.title,
      this.pano.name,
      this.tour.description,
      this.pano.description
    ).then((result) => {
      this.logger.debug(this.ti, 'Campo de texto actualizado en el servidor');
      this.util.presentAlert(this.txtUpdatedData, this.txtUpdatedData_desc, this.txtCloseButton);
    }, (err) => {
      this.logger.error(this.ti, 'Error guardando Campo de texto en el servidor: ' + err);
      this.util.presentAlert(this.txtUpdateError, this.txtUpdateError_text, this.txtCloseButton);
    });
  }

  /**
  * Obtener valor de la alfombra
  *
  * @memberof EditPanoPage
  */
  getCarpetValue(): Promise<any> {
    this.ti = this.logt + "getCarpetValue";
    this.logger.debug(this.ti, 'Entrada');

    return this.plt.GetSetNUm(1, this.tour.id, this.pano.id_pano, '12', '')
      .then((result) => {
        this.carpet = result;
        this.logger.debug(this.ti, 'Num12: ' + result);
      }, (err) => {
        this.logger.error(this.ti, 'Error guardando Campo de texto en el servidor: ' + err);
      });
  }

  /**
   * Cambiar estado de la alfombra
   *
   * @param {*} carpet
   * @memberof EditPanoPage
   */
  changeCarpet() {
    this.ti = this.logt + "changeCarpet";
    this.logger.debug(this.ti, 'Entrada');
    let value: string;
    // Poner alfombra - true
    // Quitar alfombra - false
    if (this.carpet) {
      value = '0';
    } else {
      value = '1';
    }
    this.plt.GetSetNUm(2, this.tour.id, this.pano.id_pano, '12', value)
      .then((result) => {
        this.carpet = result;
        this.logger.debug(this.ti, 'Num12: ' + result);
      }, (err) => {
        this.logger.error(this.ti, 'Error guardando Campo de texto en el servidor: ' + err);
      });
    // Saltar N páginas hacia atrás
    let N: number = 1;
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
  }
  /**
    * Abrir ventana con más opciones de edición
    * 
    * @param {TourItem} tour
    * @memberof EditPanoPage
    */
  editOptions(tour: TourItem) {
    this.ti = this.logt + "editOptions";
    let actionSheet = this.actionSheetCtrl.create({
      title: this.txtOptions,
      buttons: [
        {
          text: this.deletePanoTxt,
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'alert' : null,
          handler: () => {
            this.logger.debug(this.ti, "Borrar panorama: " + tour.id_pano);
            this.deletePano();
          }
        },
        {
          text: this.deleteTourTxt,
          icon: !this.platform.is('ios') ? 'flag' : null,
          handler: () => {
            this.logger.debug(this.ti, "Incorrecto: " + tour.title);
            this.deleteTour();
          }
        },
        {
          text: this.txtCancel,
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.logger.debug(this.ti, "Cancelar ");
          }
        }
      ]
    });

    actionSheet.present();
  }

  /**
  * Borrar el panorama actual
  * 
   * @memberof EditPanoPage
   */
  deletePano() {
    this.ti = this.logt + "deletePano";
    let ctx = this;
    let buttons = [this.txtAcceptButton, this.txtCancelButton];
    ctx.dialogs.confirm(ctx.txtConfirmMessage, ctx.deletePanoTxt, buttons)
      .then((result) => {
        this.loading.presentLoader(this.txtWorking, 10);
        // result = 1 -> ok
        // result = 2 -> cancel
        ctx.logger.debug(ctx.ti, 'Opción seleccionada: ', result.toString());
        if (result === 1) {
          ctx.plt.removeTourItem(ctx.tour.id, ctx.pano.id_pano)
            .then(() => {
              this.util.presentAlert(this.txtPanoDeleted, this.txtPanoDeleted_desc, this.txtCloseButton);
              // Si se borra un panorama saltar dos páginas hacia atrás
              let N: number = 3;
              this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
              this.loading.presentLoader('', 0);;
            }, (err) => {
              this.util.presentAlert(this.txtDelPanoError, this.txtDelPanoError_desc, this.txtCloseButton);
              ctx.logger.error(ctx.ti, 'Error borrando panorama: ' + err);
              this.loading.presentLoader('', 0);;
            });
        } else {
          ctx.logger.debug(ctx.ti, 'Se decide no borrar el pano');
        }
      });
  }

  /**
   * Borrar Tour Virtual
   *
   * @memberof EditPanoPage
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
          this.loading.presentLoader(this.txtWorking, 10);
          ctx.plt.removeTour(ctx.tour.id)
            .then(() => {
              this.util.presentAlert(this.txtTourDeleted, this.txtTourDeleted_desc, this.txtCloseButton);
              // Si se borra un tour saltar dos páginas hacia atrás
              let N: number = 2;
              this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
              this.loading.presentLoader('', 0);;
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
   * Cambiar el área a la que pertenece el panorama
   *
   * @memberof EditPanoPage
   */
  changeArea(areaId) {
    this.ti = this.logt + "changeArea";
    let panos: string = "";
    let ocultos: string = "ocultos=";
    let countPanos: number;
    let bMove: boolean = false;

    // Si se quiere mover un pano y sólo hay un panorama en la zona, no se permite
    countPanos = this.arealist.getNumPanosArea(areaId);

    if (areaId === "-1") {
      bMove = true;
    } else if (countPanos > 1) {
      bMove = true;
    }

    if (bMove) {
      this.arealist.setAreaPano(this.pano.id_pano, this.selarea);
      this.alist = this.arealist.getOrderedList();

      // Generamos un cadena de este tipo
      // "sort0=167208,167209&sort1=166756&sort2=166839,166838&ocultos=167206"
      let len = this.arealist.getLength();
      for (let i = 0; i < len; i++) {
        if (Number(this.alist[i].area_id) === -1) {
          if (this.alist[i].pano_id != "" && this.alist[i].pano_id != "0") {
            if (ocultos.slice(-1) === "=") {
              ocultos += this.alist[i].pano_id;
            } else {
              ocultos += "," + this.alist[i].pano_id;
            }
          }
        } else {
          if (this.alist[i].pano_id != "" && this.alist[i].pano_id != "0") {
            let sortA = this.alist[i].area_id + "=";
            if (panos.includes(sortA)) {
              panos += "," + this.alist[i].pano_id;
            } else {
              let inistring: string;
              if (panos == "") {
                inistring = "sort";
              } else {
                inistring = "&sort";
              }
              panos += inistring + sortA + this.alist[i].pano_id;
            }
          }
        }
      }
      if (panos === "") {
        // Si no hay nada en zonas visibles, incluimos la zona 0
        panos = "sort0=";
      }
      panos += "&" + ocultos;
      this.restApi.savePanosAreas(this.tour.id, panos)
        .then((data) => {
          // Saltar dos página s hacia atrás
          let N: number = 2;
          this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
          // Mostrar ventana con resultado
          this.util.presentAlert(this.txtUpdatedData, this.txtUpdatedData_desc, this.txtCloseButton);
        },
          (err) => {
            this.util.presentAlert(this.txtUpdateError, this.txtUpdateError_text, this.txtCloseButton);
            this.logger.error(this.ti, "Error en guardar areas: ", err);
          });
    } else {
      // Indicar que no se puede pasar a oculto cuando sólo hay una zona
      this.util.presentAlert(this.txtMoveError, this.txtMoveError_desc, this.txtCloseButton);
    }
  }

  /**
    * Saltar a la página de edición de flechas
    *
    * @memberof EditMorePanosPage
    */
  editArrows() {
    this.navCtrl.push("ListArrowsPage", { tour: this.tour, pano: this.pano, area: this.areaId });
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