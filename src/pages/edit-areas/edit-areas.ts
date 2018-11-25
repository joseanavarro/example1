import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AreaOrder } from "../../models/areaOrder";
import { TourArea } from "../../models/tourArea";
import { TourItem } from "../../models/tourItem";
import { AreasProvider } from "../../providers/areas/areas";
import { Globals } from "../../providers/globals/globals";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-edit-areas',
  templateUrl: 'edit-areas.html',
})
export class EditAreasPage {

  public tour: TourItem;
  areas: TourArea[];
  panos: TourItem[];
  logt: string;
  alist: AreaOrder[];
  txtHidden: string;
  txtEnterArea: string;
  txtCloseButton: string;
  txtAccept: string;
  countPanos: number;
  txtUpdatedData: string;
  txtUpdatedData_desc: string;
  txtUpdateError: string;
  txtUpdateError_text: string;
  txtWait: string;
  txtWorking: string;

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public util: UtilProvider,
    public globals: Globals,
    public restApi: RestApiProvider,
    public arealist: AreasProvider,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public loading: LoadingProvider
  ) {
    this.logt = "EditAreasPage | ";
    let ti = this.logt + "constructor";
    // Leer parámetros de entrada
    this.tour = navParams.get("tour");
    this.areas = navParams.get("areas");
    this.countPanos = 0;

    // Leemos los panoramas de cada zona
    this.getAllPanos();
    this.logger.debug(ti, "Creada página de mostrar áreas del tour");
    this.translate.get("hidden").subscribe(value => this.txtHidden = value);
    this.translate.get("enter_area").subscribe(value => this.txtEnterArea = value);
    this.translate.get("cancel").subscribe(value => this.txtCloseButton = value);
    this.translate.get("accept").subscribe(value => this.txtAccept = value);
    this.translate.get("updated_data").subscribe(value => this.txtUpdatedData = value);
    this.translate.get("updated_data_desc").subscribe(value => this.txtUpdatedData_desc = value);
    this.translate.get("error").subscribe(value => this.txtUpdateError = value);
    this.translate.get("db_error").subscribe(value => this.txtUpdateError_text = value);
    this.translate.get("wait").subscribe(value => this.txtWait = value);
    this.translate.get("working").subscribe(value => this.txtWorking = value);

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
   * Leer todos los panoramas y ordenarlos por zonas
   *
   * @memberof EditAreasPage
   */
  getAllPanos() {
    let ti = this.logt + "getAllPanos";
    let bHidden: boolean = false;
    let bVisible: boolean = false;
    let count: number;

    // Creamos una lista que contiene los panoramas y sus zonas
    this.restApi.getAllPanosTour(this.tour.id)
      .subscribe((result) => {

        this.arealist.clear();
        let k: number = 0;

        let len = result.length;
        this.logger.debug(ti, "Recibida lista completa de panos");
        for (let i = 0; i < len; i++) {
          let len2 = result[i].panos.length;
          if (len2 === 0) {
            // Zona sin panoramas
            this.arealist.saveItem(0, result[i].id_area, result[i].name, "0");
          } else {
            // Zona con panoramas
            for (let j = 0; j < len2; j++) {
              // Almacenar item en la lista
              this.arealist.saveItem(j, result[i].id_area, result[i].name, result[i].panos[j].id_pano);
              if (result[i].id_area === -1) {
                // Indicamos que hay área de ocultos
                bHidden = true;
              } else {
                // Incrementamos el número de panoramas en areas visibles
                this.countPanos += 1;
              }
              if (result[i].id_area != -1) {
                bVisible = true;
              }
              k += 1;
              count = j;
            }
          }
        }
        if (!bVisible) {
          this.arealist.saveItem(count + 1, 0, "", "");
          count += 1;
        }

        if (!bHidden) {
          this.arealist.saveItem(count + 1, -1, this.txtHidden, "");
        }
        this.arealist.setPanosCount(this.countPanos);
      });
  }

  /**
   * Añadir un área nueva
   *
   * @memberof EditAreasPage
   */
  addArea() {
    let ti = this.logt + "addArea";

    let alert = this.alertCtrl.create({
      title: this.txtEnterArea,
      inputs: [
        {
          name: 'areaname',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: this.txtCloseButton,
          role: 'cancel',
          handler: data => {
            this.logger.debug(ti, "Cancelar");
          }
        },
        {
          text: this.txtAccept,
          handler: data => {
            this.loading.presentLoader(this.txtWait, 10);
            this.logger.debug(ti, "Nombre de la nueva zona: ", data.areaname);
            // Añadir la nueva zona llamando al API, en caso correcto retroceder una página
            this.restApi.createArea(this.tour.id, data.areaname)
              .then((data) => {
                // Saltar hacia atrás
                let N: number = 2;
                this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - (N + 1)));
                // Mostrar ventana con resultado
                this.util.presentAlert(this.txtUpdatedData, this.txtUpdatedData_desc, this.txtAccept);
                this.loading.presentLoader('', 0);;
              },
                (err) => {
                  this.util.presentAlert(this.txtUpdateError, this.txtUpdateError_text, this.txtCloseButton);
                  this.logger.error(ti, "Error al crear zona: ", err);
                  this.loading.presentLoader('', 0);;
                });
          }
        }
      ]
    });
    alert.present();

  }

}
