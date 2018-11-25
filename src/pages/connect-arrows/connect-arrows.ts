import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotSpot } from "../../models/hotSpot";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-connect-arrows',
  templateUrl: 'connect-arrows.html',
})
export class ConnectArrowsPage {

  logt: string;
  ti: string;
  tour: TourItem;
  pano1: string;
  pano2: string;
  command: number = 1; // Por defecto se crea una conexión
  // 1 - Crear
  // 2 - Editar
  // 3 - Borrar 
  second: boolean = true;
  arrow: HotSpot;
  arrow2: HotSpot;  // Flecha de retorno

  // global krpano interface (will be set in the onready callback)
  krpano1 = null;
  krpano2 = null;

  txtConfirmMessage: string;
  deleteHotspotTxt: string;
  txtWait: string;
  txtWorking: string;
  txtHotspotDeleted: string;
  txtHotspotDeleted_desc: string;
  txtDelHotspotError: string;
  txtDelHotspotError_desc: string;
  txtCloseButton: string;
  txtHotspotEdited: string;
  txtHotspotEdited_desc: string;
  txtEditHotspotError: string;
  txtEditHotspotError_desc: string;
  reverseArrow: boolean;
  txtAcceptButton: string;
  txtCancelButton: string;

  constructor(
    public navCtrl: NavController,
    private logger: Logger,
    private insomnia: Insomnia,
    public dialogs: Dialogs,
    public util: UtilProvider,
    public restApi: RestApiProvider,
    public translate: TranslateService,
    public ga: GoogleAnalytics,
    public navParams: NavParams,
    public loading: LoadingProvider
  ) {
    this.logt = "ConnectArrowsPage | ";
    this.ti = this.logt + "constructor";
    // Leer las identidades de los dos panoramas que hay que conectar
    this.command = navParams.get("command");
    if (this.command == undefined) {
      this.command = 1;
    }
    if (this.command === 3) {
      this.second = false;
    }
    this.tour = navParams.get("tour");
    this.arrow = navParams.get("arrow");
    if (this.arrow === undefined) {
      this.pano1 = navParams.get("c1");
      this.pano2 = navParams.get("c2");
      this.arrow = new HotSpot();
      this.arrow.p1 = this.pano1;
      this.arrow.p2 = this.pano2;
    } else {
      this.pano1 = this.arrow.p1;
      this.pano2 = this.arrow.p2;
    }
    this.arrow2 = new HotSpot();
    this.arrow2.p1 = this.pano2;
    this.arrow2.p2 = this.pano1;

    this.translate.get("delete_hotspot_confirm").subscribe(value => this.txtConfirmMessage = value);
    this.translate.get("delete_hotspot").subscribe(value => this.deleteHotspotTxt = value);
    this.translate.get("wait").subscribe(value => this.txtWait = value);
    this.translate.get("working").subscribe(value => this.txtWorking = value);
    this.translate.get("hotspot_deleted").subscribe(value => this.txtHotspotDeleted = value);
    this.translate.get("hotspot_deleted_desc").subscribe(value => this.txtHotspotDeleted_desc = value);
    this.translate.get("err_hotspot_deleted").subscribe(value => this.txtDelHotspotError = value);
    this.translate.get("err_hotspot_deleted_desc").subscribe(value => this.txtDelHotspotError_desc = value);
    this.translate.get("close_button").subscribe(value => this.txtCloseButton = value);
    this.translate.get("hotspot_edited").subscribe(value => this.txtHotspotEdited = value);
    this.translate.get("hotspot_edited_desc").subscribe(value => this.txtHotspotEdited_desc = value);
    this.translate.get("err_hotspot_edited").subscribe(value => this.txtEditHotspotError = value);
    this.translate.get("err_hotspot_edited_desc").subscribe(value => this.txtEditHotspotError_desc = value);
    this.translate.get("cancel").subscribe(value => this.txtCancelButton = value);
    this.translate.get("accept").subscribe(value => this.txtAcceptButton = value);

  }

  /**
   * It’s fired when entering a page, before it becomes the active one. 
   * Use it for tasks you want to do every time you enter in the view 
   * (setting event listeners, updating a table, etc.).
   * 
   * @memberof TourDetailPage
   */
  ionViewWillEnter() {
    this.ti = "ionViewWillEnter";
    // Inicializar panoramas    
    if (this.command === 2 || this.command === 3) {
      this.initPano(this.pano1, "1", this.arrow.a1.toString().replace(",", "."));
    } else {
      this.initPano(this.pano1, "1", "0");
    }

    if (this.second) {
      if (this.command === 2) {
        this.initPano(this.pano2, "2", this.arrow.a2.toString().replace(",", "."));
      } else {
        this.initPano(this.pano2, "2", "0");
      }
    }

    //this.initPano(this.pano1);
    // Impedir que se apague la pantalla
    this.insomnia.keepAwake()
      .then(
        () => this.logger.debug(this.ti, "insomnia keepAwake ok "),
        (err) => this.logger.error(this.ti, "Error: ", err)
      );
    this.ga.trackView('ConnectArrowsPage');
  }

  /**
 * Inicializar y cargar la vista del panorama
 *
 * @param {TourItem} item
 * @memberof TourDetailPage
 */
  initPano(item: string, itarget: string, ang: string) {
    setTimeout(() => {
      (<any>window).removepano("krpano-embed" + itarget);
      (<any>window).embedpano({
        swf: "assets/js/krpano/krpano.js",
        html5: "prefer",
        xml: AppConstants.KRPANO_API + "/eapp_xml.aspx?p_registro=" + item + "&script=2&ang=" + ang + "&p_template=MFSG22LO_mwalk2view",
        target: "pano" + itarget,
        id: "krpano-embed" + itarget
      });
    }, 0);
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
      "background-image": "url('" + AppConstants.THUMB_URL + "0')"
    };
    return myStyles;
  }

  /**
     * Volver a la página de 'mis fotos'
     *
     * @memberof EditAreasPage
     */
  goBack() {
    this.navCtrl.setRoot("MyPhotosPage");
  }

  /**
   * Añadir los datos de las felchas de navegación
   *
   * @memberof ConnectArrowsPage
   */
  addArrow() {

    this.ti = this.logt + "addArrow";
    let ctx = this;

    // Tomar los ángulos actuales de los dos panoramas
    this.getAngles(this.arrow);

    ctx.restApi.editHotSpot("c", this.tour.id, this.arrow)
      .then(() => {
        if (this.reverseArrow) {
          // Incluir flecha de retorno
          this.arrow2.p1 = this.arrow.p2;
          this.arrow2.p2 = this.arrow.p1;
          // Añdir 180º a los ángulos
          this.arrow2.a1 = String(Number(this.arrow.a2) + 180);
          ctx.logger.debug(ctx.ti, 'Ángulo 1: ', this.arrow2.a1);
          this.arrow2.a2 = String(Number(this.arrow.a1) + 180);
          ctx.logger.debug(ctx.ti, 'Ángulo 2: ', this.arrow2.a2);
          ctx.restApi.editHotSpot("c", this.tour.id, this.arrow2)
            .then(() => {
              this.util.presentAlert(this.txtHotspotEdited, this.txtHotspotEdited_desc, this.txtCloseButton);
              // Si se borra un panorama saltar dos páginas hacia atrás
              let N: number = 2;
              this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
              this.loading.presentLoader('', 0);;
            }, (err) => {
              this.util.presentAlert(this.txtEditHotspotError, this.txtEditHotspotError_desc, this.txtCloseButton);
              ctx.logger.error(ctx.ti, 'Error borrando panorama: ' + err);
              this.loading.presentLoader('', 0);;
            });
        } else {
          this.util.presentAlert(this.txtHotspotEdited, this.txtHotspotEdited_desc, this.txtCloseButton);
          // Si se borra un panorama saltar dos páginas hacia atrás
          let N: number = 2;
          this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
          this.loading.presentLoader('', 0);;
        }
      }, (err) => {
        this.util.presentAlert(this.txtEditHotspotError, this.txtEditHotspotError_desc, this.txtCloseButton);
        ctx.logger.error(ctx.ti, 'Error borrando panorama: ' + err);
        this.loading.presentLoader('', 0);;
      });
  }

  /**
   * Obtener los datos actuales de los panoramas de la conexión
   *
   * @param {HotSpot} arrow
   * @returns {HotSpot}
   * @memberof ConnectArrowsPage
   */
  getAngles(arrow: HotSpot) {
    this.ti = this.logt + "getPanoAngle";
    // Tomar los ángulos de los dos panoramas
    let krpano: any = document.getElementById("krpano-embed1");
    arrow.a1 = krpano.get("view.hlookat");
    this.logger.debug(this.ti, "View 1: ", arrow.a1);
    krpano = document.getElementById("krpano-embed2");
    arrow.a2 = krpano.get("view.hlookat");
    this.logger.debug(this.ti, "View 2: ", arrow.a2);
  }

  /**
   * Editar una flecha de conexión
   *
   * @param {*} arrow
   * @memberof ConnectArrowsPage
   */
  editArrow(arrow: HotSpot) {
    this.ti = this.logt + "editArrow";
    let ctx = this;

    // Tomar los ángulos actuales de los dos panoramas
    this.getAngles(arrow);

    ctx.restApi.editHotSpot("e", this.tour.id, arrow)
      .then(() => {
        this.util.presentAlert(this.txtHotspotEdited, this.txtHotspotEdited_desc, this.txtCloseButton);
        // Si se borra un panorama saltar dos páginas hacia atrás
        let N: number = 2;
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
        this.loading.presentLoader('', 0);;
      }, (err) => {
        this.util.presentAlert(this.txtEditHotspotError, this.txtEditHotspotError_desc, this.txtCloseButton);
        ctx.logger.error(ctx.ti, 'Error borrando panorama: ' + err);
        this.loading.presentLoader('', 0);;
      });
  }

  /**
   * Borrar una flecha de conexión
   *
   * @param {*} arrow
   * @memberof ConnectArrowsPage
   */
  deleteArrow(arrow: HotSpot) {
    this.ti = this.logt + "deleteArrow";
    let ctx = this;

    // Pedir confirmación
    let buttons = [this.txtAcceptButton, this.txtCancelButton];
    ctx.dialogs.confirm(ctx.txtConfirmMessage, ctx.deleteHotspotTxt, buttons)
      .then((result) => {
        // result = 1 -> ok
        // result = 2 -> cancel
        ctx.logger.debug(ctx.ti, 'Opción seleccionada: ', result.toString());
        if (result === 1) {
          this.loading.presentLoader(this.txtWait, 10);

          ctx.restApi.editHotSpot("d", this.tour.id, arrow)
            .then(() => {
              this.util.presentAlert(this.txtHotspotDeleted, this.txtHotspotDeleted_desc, this.txtCloseButton);
              // Si se borra un panorama saltar dos páginas hacia atrás
              let N: number = 2;
              this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
              this.loading.presentLoader('', 0);;
            }, (err) => {
              this.util.presentAlert(this.txtDelHotspotError, this.txtDelHotspotError_desc, this.txtCloseButton);
              ctx.logger.error(ctx.ti, 'Error borrando panorama: ' + err);
              this.loading.presentLoader('', 0);;
            });

        } else {
          ctx.logger.debug(ctx.ti, 'Se decide no borrar el pano');
        }
      });
  }

}
