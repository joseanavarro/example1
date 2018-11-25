import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AreaPano } from "../../models/areaPano";
import { TourItem } from "../../models/tourItem";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-edit-more-panos',
  templateUrl: 'edit-more-panos.html',
})
export class EditMorePanosPage {
  public tour: TourItem;
  public data: any;
  public area: number;
  public panos: AreaPano[];
  public logt: string;
  public notLoaded: boolean = true;
  public areaname: string;
  public ti: string;
  updated_data: string;
  updated_data_desc: string;
  confirmMessage: string;
  confirmTitle: string;
  closeButton: string;
  txtUpdateError: string;
  txtUpdateError_text: string;
  txtWait: string;
  txtWorking: string;
  txtAcceptButton: string;
  txtCancelButton: string;

  /**
   * Creates an instance of MorePanosPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @memberof MorePanosPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public dialogs: Dialogs,
    public util: UtilProvider,
    public translate: TranslateService,
    public restApi: RestApiProvider,
    public loading: LoadingProvider
  ) {
    this.logt = "EditMorePanosPage | ";
    this.ti = this.logt + "constructor";
    // Leer parámetros de entrada
    this.tour = navParams.get("tour");
    this.area = navParams.get("area");
    this.areaname = navParams.get("areaname");

    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("updated_data").subscribe(value => this.updated_data = value);
    this.translate.get("updated_data_desc").subscribe(value => this.updated_data_desc = value);
    this.translate.get("delete_area").subscribe(value => this.confirmTitle = value);
    this.translate.get("delete_area_confirm").subscribe(value => this.confirmMessage = value);
    this.translate.get("error").subscribe(value => this.txtUpdateError = value);
    this.translate.get("db_error").subscribe(value => this.txtUpdateError_text = value);
    this.translate.get("wait").subscribe(value => this.txtWait = value);
    this.translate.get("working").subscribe(value => this.txtWorking = value);
    this.translate.get("cancel").subscribe(value => this.txtCancelButton = value);
    this.translate.get("accept").subscribe(value => this.txtAcceptButton = value);

    // Pedir la lista de panoramas 
    this.restApi.getPanosArea(this.tour.id, this.area).subscribe(res => {
      this.panos = res.Panos;
      this.notLoaded = false;
    }, (err) => {
      this.notLoaded = false;
      this.logger.error(this.ti, "Error: ", err);
    });
    this.logger.debug(this.ti, "Creada página de mostrar más panoramas");
  }

  ionViewDidLoad() {
    this.ti = this.logt + "ionViewDidLoad";
    this.logger.debug(this.ti, 'ionViewDidLoad MorePanosPage');
  }

  /**
   * Borrar el área actual
   *  
   * @param {string} area
   * @memberof EditMorePanosPage
   */
  deleteArea(area: string) {

    this.ti = this.logt + "deleteArea";
    let ctx = this;
    let buttons = [this.txtAcceptButton, this.txtCancelButton];
    ctx.dialogs.confirm(ctx.confirmMessage, ctx.confirmTitle, buttons)
      .then((result) => {
        // result = 1 -> ok
        // result = 2 -> cancel
        ctx.logger.debug(ctx.ti, 'Opción seleccionada: ', result.toString());
        if (result === 1) {
          this.loading.presentLoader(this.txtWait + ' ' + this.txtWorking, 20);

          this.restApi.deleteArea(this.tour.id, area)
            .then((data) => {
              // Saltar 3 páginas hacia atrás
              let N: number = 3;
              this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
              // Mostrar ventana con resultado
              ctx.util.presentAlert(ctx.updated_data, ctx.updated_data_desc, ctx.closeButton);
              this.loading.presentLoader('', 0);;
            },
              (err) => {
                this.util.presentAlert(this.txtUpdateError, this.txtUpdateError_text, ctx.closeButton);
                this.logger.error(this.ti, "Error al borrar zona: ", err);
                this.loading.presentLoader('', 0);;
              });

        } else {
          ctx.logger.debug(ctx.ti, 'Se decide no borrar la zona');
        }
      });
  }

  /**
 * Borrar el área actual
 *  
 * @param {string} area
 * @memberof EditMorePanosPage
 */
  editArea(area: string) {

    this.ti = this.logt + "deleteArea";

    this.loading.presentLoader(this.txtWorking, 20);

    this.restApi.editArea(this.tour.id, area, this.areaname)
      .then((data) => {
        // Saltar 3 páginas hacia atrás
        let N: number = 3;
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
        // Mostrar ventana con resultado
        this.util.presentAlert(this.updated_data, this.updated_data_desc, this.closeButton);
        this.loading.presentLoader('', 0);;
      },
        (err) => {
          this.util.presentAlert(this.txtUpdateError, this.txtUpdateError_text, this.closeButton);
          this.logger.error(this.ti, "Error al borrar zona: ", err);
          this.loading.presentLoader('', 0);;
        });
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
