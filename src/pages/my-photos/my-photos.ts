import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { TourUtilProvider } from "../../providers/tour-util/tour-util";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-my-photos',
  templateUrl: 'my-photos.html',
})
export class MyPhotosPage {

  logt: string;
  ti: string;
  unpubTours: Object[];
  viewList: boolean;
  viewList2: boolean;
  confirmMessage: string;
  confirmTitle: string;
  dbError: string;
  contactSupport: string;
  btnClose: string;
  txtAcceptButton: string;
  txtCancelButton: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public restApi: RestApiProvider,
    public globals: Globals,
    public db: DatabaseService,
    public util: UtilProvider,
    public dialogs: Dialogs,
    public translate: TranslateService,
    public tourUtil: TourUtilProvider
  ) {
    this.logt = "MyPhotosPage | ";
    this.ti = this.logt + "constructor";

    this.translate.get("delete_tour").subscribe(value => this.confirmTitle = value);
    this.translate.get("delete_tour_confirm").subscribe(value => this.confirmMessage = value);
    this.translate.get("db_error").subscribe(value => this.dbError = value);
    this.translate.get("contact_support").subscribe(value => this.contactSupport = value);
    this.translate.get("close_button").subscribe(value => this.btnClose = value);
    this.translate.get("cancel").subscribe(value => this.txtCancelButton = value);
    this.translate.get("accept").subscribe(value => this.txtAcceptButton = value);
  }

  /**
    * Se ejecuta siempre que se entra en la página
    * 
    * @memberof NewPanoPage
    */
  ionViewWillEnter() {
    this.ti = this.logt + "ionViewWillEnter";
    this.viewList2 = true;
    this.loadAllTours()
      .then(() => this.viewList2 = true)
      .catch(() => this.viewList2 = false);
  }


  /**
   * Muestra todos los tours almacenados en el dispositivo
   * 
   * @memberof MyPhotosPage
   */
  loadAllTours() {
    this.ti = this.logt + "loadAllTours";
    return new Promise((resolve, reject) => {
      //Leer tabla de Tours y tomar los no publicados
      this.db.getAllTours()
        .then((result) => {
          if (result !== null) {
            // Iterar por los tours
            this.unpubTours = new Array();
            if (result.length > 0) {
              this.viewList = true;
              this.logger.debug(this.ti, 'Encontradas visitas en el dispositivo');
              /* jshint loopfunc:true */
              for (let i = 0; i < result.length; i++) {
                this.unpubTours.push(result.item(i))
                this.logger.debug(this.ti, 'tour name = ' + result.item(i).name);
                this.logger.debug(this.ti, 'tour status = ' + result.item(i).status);
              }
              resolve();
            } else {
              this.viewList = false;
              reject();
            }
          } else {
            this.viewList = false;
            reject();
          }
        }, (err) => {
          this.logger.error(this.ti, 'Error leyendo tours no publicados: ', err);
          reject();
        });
    });
  }

  /**
   * Borrar visita virtual
   * 
   * @param {any} tour_id 
   * @memberof MyPhotosPage
   */
  deleteTour(tour_id: number, tour_name: string) {
    this.ti = this.logt + "deleteTour";
    //let panosToDelete = [];

    let buttons = [this.txtAcceptButton, this.txtCancelButton];
    this.dialogs.confirm(this.confirmMessage + " '" + tour_name + "'?", this.confirmTitle, buttons)
      .then((result) => {
        // result = 1 -> ok
        // result = 2 -> cancel
        this.logger.debug(this.ti, 'Opción seleccionada: ', result.toString());
        if (result === 1) {
          this.tourUtil.deleteTour(tour_id)
            .then(() => {
              // Recargar la página
              this.globals.tourTitle = '';
              this.navCtrl.setRoot("MyPhotosPage");
            });
        } else {
          this.logger.debug(this.ti, 'Se decide no borrar el tour');
        }
      })
      .catch(e => {
        this.logger.error(this.ti, 'Error mostrando dialogo de borrado de tours: ', e);
        this.util.presentAlert(this.dbError, this.contactSupport, this.btnClose);
      });
  }

  /**
   * Ir a la página de publicación del tour
   * 
   * @param {number} tour_id 
   * @memberof MyPhotosPage
   */
  publishTour(tour_id: number, edit: boolean = false) {
    this.navCtrl.push("PublishTourPage", { tourId: tour_id, editTour: edit });
  }

  /**
   * Ir a la página de añadir dos tours existentes
   * 
   * @param {number} tour_id 
   * @memberof MyPhotosPage
   */
  joinTours(tour_id: number) {
    this.navCtrl.push("JoinToursPage", { tourId: tour_id });
  }

}
