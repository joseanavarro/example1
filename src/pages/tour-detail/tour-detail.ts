import { Component } from "@angular/core";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Insomnia } from '@ionic-native/insomnia';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from "@ngx-translate/core";
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { AreaPano } from "../../models/areaPano";
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { DatabaseService } from "../../providers/database-service/database-service";
import { GeoProvider } from "../../providers/geo/geo";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { ShareLocationProvider } from '../../providers/share-location/share-location';
import { UtilProvider } from "../../providers/util/util";
import { isCordovaAvailable } from '../../services/is-cordova-available';

@IonicPage()
@Component({
  selector: "page-tour-detail",
  templateUrl: "tour-detail.html",
  providers: [DatabaseService]
})
export class TourDetailPage {
  public pano: TourItem;
  public tour: TourItem;
  public areaname: string;
  comments: string[];
  tour_areas: TourArea[];
  more_panos: TourItem[];
  panoData: TourArea;
  logt: string;
  ti: string;
  showmoreclass: string;
  isLogged: boolean;
  moreComments: boolean;
  public liked: boolean;
  commentText: any;
  httpError: string;
  httpErrorDesc: string;
  closeButton: string;
  authError: string;
  authErrorDesc: string;
  optionSelected: any;
  txtShare: string;
  txtReport: string;
  txtCancel: string;
  txtViewShare: string;
  txtInadequate: string;
  txtWrong: string;
  morePanos: boolean;
  moreAreas: boolean;
  numAreas: number;
  extrapano: boolean = false;
  isRoot: boolean = false;
  panoTitle: string;
  panoDescription: string;
  locationName: string;
  krp = null;
  txtVrTitle: string;
  txtVrDesc: string;

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
    private insomnia: Insomnia,
    public translate: TranslateService,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public socialSharing: SocialSharing,
    public db: DatabaseService,
    public ga: GoogleAnalytics,
    public geo: GeoProvider,
    public shareLoc: ShareLocationProvider,
    public iab: InAppBrowser,
    public alertCtrl: AlertController
  ) {
    this.logt = "TourDetailPage | ";
    this.ti = this.logt + "constructor";
    // Leer parámetros de entrada
    this.pano = navParams.get("item");
    this.tour = navParams.get("tour");
    this.isRoot = navParams.get("root");

    this.areaname = navParams.get("areaname");

    this.logger.trace(this.ti, "this.pano: ", JSON.stringify(this.pano))
    this.logger.trace(this.ti, "this.tour: ", JSON.stringify(this.tour))
    this.logger.trace(this.ti, "this.areaname: ", JSON.stringify(this.areaname))

    if (this.areaname !== undefined) {
      this.extrapano = true;
    } else {
      this.extrapano = false;
      this.tour = this.pano;
    }

    this.panoTitle = this.tour.title;
    this.logger.debug(this.ti, "panoTitle: "), this.panoTitle;
    this.panoDescription = this.tour.description;
    this.logger.debug(this.ti, "panoDescription: "), this.panoDescription;

    this.logger.debug(this.ti, "Id Tour: ", this.pano.id);

    // Registrar visualización del tour
    if (this.pano.id !== undefined) {
      util.trackview(this.pano.id);
    }

    this.logger.debug(this.ti, "Título Tour: ", this.pano.title);
    this.translate.get("http_error").subscribe(value => this.httpError = value);
    this.translate.get("http_error_desc").subscribe(value => this.httpErrorDesc = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("user_error").subscribe(value => this.authError = value);
    this.translate.get("must_login_first").subscribe(value => this.authErrorDesc = value);
    this.translate.get("share").subscribe(value => this.txtShare = value);
    this.translate.get("cancel").subscribe(value => this.txtCancel = value);
    this.translate.get("view_share").subscribe(value => this.txtViewShare = value);
    this.translate.get("report_content").subscribe(value => this.txtReport = value);
    this.translate.get("inadequate_content").subscribe(value => this.txtInadequate = value);
    this.translate.get("wrong_content").subscribe(value => this.txtWrong = value);
    this.translate.get("vr_title").subscribe(value => this.txtVrTitle = value);
    this.translate.get("vr_open_help").subscribe(value => this.txtVrDesc = value);

    this.locationName = this.getLocationName(this.tour);

    // Evento de cambio de cambio de datos de localización
    // actualizamos la variable 'location' con el valor recibido
    shareLoc.valueChanged.subscribe(
      (value) => {
        this.locationName = value.description;
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
    this.liked = this.pano.liked;
    // Obtener todos los datos del panorama
    this.getPanoData(this.pano.id_pano);
    // Inicializar panorama    
    this.initPano(this.pano);
    // Impedir que se apague la pantalla
    this.insomnia.keepAwake()
      .then(
        () => this.logger.debug(this.ti, "insomnia keepAwake ok "),
        (err) => this.logger.error(this.ti, "Error: ", err)
      );
    // Comprobar si el tour tiene más panoramas
    if (this.extrapano) {
      this.morePanos = false;
    } else {
      this.checkMorePanos();
    }
    // Cargar los comentarios
    this.getComments();
    this.ga.trackView('TourDetailPage');
  }

  /**
  * Fired when you leave a page, before it stops being the active one. 
  * Use it for things you need to run every time you are leaving a page 
  * (deactivate event listeners, etc.).
  * 
  * @memberof TourDetailPage
  */
  ionViewWillUnload() {
    this.insomnia.allowSleepAgain()
      .then(
        () => this.logger.debug(this.ti, "insomnia allowSleepAgain ok "),
        (err) => this.logger.error(this.ti, "Error: ", err)
      );
    //(<any>window).removepano("krpano-embed");
  }

  /**
   * Inicializar y cargar la vista del panorama
   *
   * @param {TourItem} item
   * @memberof TourDetailPage
   */
  initPano(item: TourItem) {
    //var panoId: string = "krpano-" + item.id_pano;
    setTimeout(function () {
      (<any>window).removepano("krpano-embed");
      (<any>window).embedpano({
        swf: "assets/js/krpano/krpano.js",
        html5: "prefer",
        xml: AppConstants.KRPANO_API + "/mapp-" + item.id_pano + AppConstants.KRPANO_TEMPLATE,
        target: "PanoContainer",
        id: "krpano-embed"
      });
    }, 0);
  }

  /**
   * Prueba para leer el valor de ángulo de giro del panorama
   *
   * @memberof TourDetailPage
   */
  getPanoAngle() {
    this.ti = this.logt + "getPanoAngle";
    let krpano: any = document.getElementById("krpano-embed");
    let angle = krpano.get("view.hlookat");
    this.logger.debug(this.ti, "View: ", angle);
  }

  /**
   * Abrir la vista VR
   *
   * @memberof TourDetailPage
   */
  enterVR() {
    this.ti = this.logt + "enterVR";
    this.logger.debug(this.ti, "entrar en VR ");
    if (this.platform.is('android')) {
      let krpano: any = document.getElementById("krpano-embed");
      krpano.call("webvr.enterVR();");
    }
    else {
      // Parche para iOS, ya que no funciona el cdigo de android
      // Se abre un inAppBrowser con la vista VR del tour
      let shareLink = AppConstants.VR_LINK.replace("@tourId@", this.tour.id_pano);
      this.logger.info(this.ti, "pano ext = ", shareLink);

      let alert = this.alertCtrl.create({
        title: this.txtVrTitle,
        subTitle: this.txtVrDesc,
        buttons: [{
          text: this.closeButton,
          handler: data => {
            this.iab.create(shareLink, '_blank', 'location=no,footer=yes,footercolor=#3a6658');
          }
        }]
      });
      alert.present();

    }
  };

  /**º
   * Leer los comentarios del tour
   * 
   * @memberof TourDetailPage
   */
  getComments() {
    this.ti = this.logt + "getComments";
    this.restApi.getComments(this.tour.id, 1, 2).subscribe(res => {
      this.comments = res.Elems;
      res.totalPages > 1 ? this.moreComments = true : this.moreComments = false;
    }, (err) => {
      this.logger.error(this.ti, "Error: ", err);
    });
  }

  /**
   * Leer datos del panorama actual
   *
   * @param {*} panoId
   * @memberof TourDetailPage
   */
  getPanoData(panoId) {
    this.ti = this.logt + "getPanoData";
    let ctx = this;
    this.restApi.getPanoData(panoId).subscribe(res => {
      this.panoData = res;
      ctx.logger.debug(ctx.ti, "Recibido");
      // Construir cadena eliminando caracteres null
      ctx.panoTitle = this.util.getStr(ctx.tour.title) + "\n\n" + this.util.getStr(res.title);
      ctx.logger.debug(ctx.ti, "panoTitle: "), ctx.panoTitle;
      ctx.panoDescription = this.util.getStr(ctx.tour.description) + "\n\n" + this.util.getStr(res.description);
      ctx.logger.debug(ctx.ti, "panoDescription: "), ctx.panoDescription;
    }, (err) => {
      ctx.logger.error(ctx.ti, "Error: ", err);
    });
  }

  /**
  * Comprobar si el tour tiene más panoramas
  * 
  * @memberof TourDetailPage
  */
  checkMorePanos() {
    this.ti = this.logt + "checkMorePanos";
    let ctx = this;
    ctx.restApi.getAreas(ctx.tour.id).subscribe(res => {
      ctx.tour_areas = res.Elems;
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
   * Mostrar la lista de áreas del tour
   * 
   * @param {TourItem} tour 
   * @param {TourArea[]} tour_areas 
   * @memberof TourDetailPage
   */
  showAreas(item: TourItem, tour_areas: TourArea[]) {
    this.navCtrl.push("ShowAreasPage", { tour: item, areas: tour_areas });
  }

  /**
   * Mostrar más panoramas del tour
   * 
   * @param {TourItem} tour 
   * @memberof TourDetailPage
   */
  showMorePanos(item: TourItem) {
    let N: number = 1;
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
    this.navCtrl.push("MorePanosPage", { tour: item, area: 0, areaname: "" });
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
   *
   *
   * @param {*} comment
   * @returns
   * @memberof TourDetailPage
   */
  getCommentAvatar(comment: any) {
    let myStyles = {
      "background-image": "url('" + comment.avatar + "')"
    };
    return myStyles;
  }

  /**
     *
     *
     * @param {*} comment
     * @returns
     * @memberof TourDetailPage
     */
  getUserAvatar() {
    let myStyles = {
      "background-image": "url('" + this.globals.loggedUser.photo + "')"
    };
    return myStyles;
  }

  /**
   * Obtener imagen de perfil
   *
   * @param {TourItem} item
   * @returns
   * @memberof TourItemComponent
   */
  getProfilePic(item: TourItem) {
    return this.util.getProfilePic(item);
  }

  /**
   * Obtener el nombre correcto de la ubicación del panorama
   *
   * @param {TourItem} item
   * @returns
   * @memberof TourItemComponent
   */
  getLocationName(item: TourItem) {
    return this.geo.getLocationName(item);
  }

  /**
   * Cambiar la extensión del párrafo de descripción
   *
   * @memberof TourDetailPage
   */
  showMore() {
    if (this.showmoreclass === "show-more-active") {
      this.showmoreclass = "";
    } else {
      this.showmoreclass = "show-more-active";
    }
  }

  /**
   * Abrir la página de comentarios
   * 
   * @memberof TourDetailPage
   */
  showMoreComments(visit: TourItem) {
    this.navCtrl.push("CommentsPage", { item: visit });
  }

  /**
   * Abrir mapa
   * 
   * @memberof TourDetailPage
   */
  openMap(visit: TourItem) {
    this.navCtrl.push("DetailMapPage", { item: visit });
  }

  /**
   * Saltar a la página del fotógrafo
   *
   * @param {number} user
   * @memberof TourItemComponent
   */
  photographerProfile(user: number) {
    this.navCtrl.push("UserProfilePage", { item: user });
  }

  /**
   * Enviar comentario
   * 
   * @memberof TourDetailPage
   */
  addComment(item: TourItem) {
    this.ti = this.logt + "addComment";

    this.restApi.addComment(item, this.commentText).subscribe(
      data => {
        // Leer y recargar los comentarios del tour
        this.logger.trace(this.ti, "Comentario agregado: ", this.commentText);
        this.getComments();
        this.pano.total_comentarios += 1;
        // Vaciar el casillero de entrada de texto
        this.commentText = "";
        this.ga.trackEvent(AppConstants.SC_TOUR, "comment", "add");
      },
      err => {
        this.logger.error(this.ti, "Error: ", err);
        // Mostrar mensaje de error
        this.util.presentAlert(this.httpError, this.httpErrorDesc, this.closeButton);
      }
    );
  }

  /**
   * Indicar que gusta el tour
   *
   * @memberof TourDetailPage
   */
  like(item: TourItem, value: boolean) {
    this.ti = this.logt + "like";
    this.restApi.like(item, value).subscribe(
      data => {
        // Cambiar el color del icono
        this.liked = !this.liked;
        // Cambiar el número de likes mostrados
        if (value) {
          item.likes += 1;
        } else {
          item.likes -= 1;
        }
        this.ga.trackEvent(AppConstants.SC_TOUR, "like", this.liked.toString());
      },
      err => {
        this.logger.error(this.ti, "Error: ", err);
        if (err.status === 403) {
          // Mostrara error de autentificación
          this.util.presentAlert(this.authError, this.authErrorDesc, this.closeButton);
        }
        else {
          // Mostrar mensaje de error de conexión
          this.util.presentAlert(this.httpError, this.httpErrorDesc, this.closeButton);
        }
      }
    );
  }

  /**
   * Compartir tour
   * 
   * @param {any} tour 
   * @memberof TourDetailPage
   */
  shareTour(tour: TourItem) {
    this.ti = this.logt + "shareTour";
    if (!isCordovaAvailable()) {
      return false;
    }
    let shareLink = AppConstants.SHARE_LINK.replace("@tourId@", tour.id_pano);

    this.socialSharing.share(tour.description + this.txtViewShare, tour.title, tour.thumbnail, shareLink)
      .then(() => {
        //console.log('Success!');
        this.logger.debug(this.ti, "Correcto ");
        this.ga.trackEvent(AppConstants.SC_TOUR, "share", tour.id.toString());
      })
      .catch((error) => {
        this.logger.error(this.ti, "Error: ", error);
      });

  }

  /**
   * Abrir ventana con opciones para denunciar contenido
   * 
   * @param {TourItem} tour 
   * @memberof TourDetailPage
   */
  alertTour(tour: TourItem) {
    this.ti = this.logt + "alertTour";
    let actionSheet = this.actionSheetCtrl.create({
      title: this.txtReport,
      buttons: [
        {
          text: this.txtInadequate,
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'alert' : null,
          handler: () => {
            this.logger.debug(this.ti, "Inadecuado: " + tour.title);
            this.navCtrl.push("ReportInadequatePage", { item: tour });
          }
        },
        {
          text: this.txtWrong,
          icon: !this.platform.is('ios') ? 'flag' : null,
          handler: () => {
            this.logger.debug(this.ti, "Incorrecto: " + tour.title);
            this.navCtrl.push("ReportIncorrectPage", { item: tour });
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
   * Mostrar página de edición
   * 
   * @memberof TourDetailPage
   */
  edit(tour: TourItem, panoData: AreaPano) {
    this.navCtrl.push("EditPanoPage", { tour: tour, pano: panoData });
  }
}