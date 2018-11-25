import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: "page-config",
  templateUrl: "config.html"
})
export class ConfigPage {

  hasCameraWifi: boolean;
  cameraWifi: string;
  delTourAfterPub: boolean;
  remPhotoAfter: boolean;
  getLocation: boolean;
  saveToExternal: boolean;
  wifiCon: boolean;

  closeButton: string;
  updated_data: string;
  updated_data_desc: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public globals: Globals,
    public util: UtilProvider,
    public db: DatabaseService,
    public platform: Platform
  ) {
    // Inicialización de datos y variables si es necesarios
  }

  ionViewDidLoad() {
    // Tareas de inicialización
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("updated_data").subscribe(value => this.updated_data = value);
    this.translate.get("updated_data_desc").subscribe(value => this.updated_data_desc = value);
  }

  /**
   * Ejecutar al abrir la página
   *
   * @memberof ConfigPage
   */
  ionViewWillEnter() {

    this.cameraWifi = this.globals.cameraWifi;
    if (this.cameraWifi != '') {
      this.hasCameraWifi = false;
    } else {
      this.hasCameraWifi = true;
    }
    this.delTourAfterPub = this.globals.delTourAfterPub;
    this.remPhotoAfter = this.globals.cfgDelCameraFoto;
    this.remPhotoAfter = this.globals.cfgDelCameraFoto;
    this.getLocation = this.globals.cfgGetLocation;
    this.saveToExternal = this.globals.cfgSaveToExternal;
    //this.wifiCon = this.globals.wifiCon;
    //if (!this.platform.is('android')) {
    // Si no es Android no se puede controlar la conexión wifi
    // desde la App
    this.wifiCon = false;
    this.globals.wifiCon = false;
    //}
  }

  /**
   * Guardar la nueva configuración
   *
   * @memberof ConfigPage
   */
  saveConfig() {

    this.globals.delTourAfterPub = this.delTourAfterPub;
    this.globals.cfgDelCameraFoto = this.remPhotoAfter;
    this.globals.cfgGetLocation = this.getLocation;
    this.globals.cameraWifi = this.cameraWifi;
    this.globals.cfgSaveToExternal = this.saveToExternal;
    this.globals.wifiCon = this.wifiCon;

    this.db.saveOption('wifiCon', String(this.wifiCon))
      .then((data) => {
        this.db.saveOption('saveToExternal', String(this.saveToExternal))
          .then((data) => {
            this.db.saveOption('cameraWifi', String(this.cameraWifi))
              .then((data) => {
                this.db.saveOption('getLocation', String(this.getLocation))
                  .then((data) => {
                    this.db.saveOption('remPhotoAfter', String(this.remPhotoAfter))
                      .then((data) => {
                        this.db.saveOption('delTourAfterPub', String(this.delTourAfterPub))
                          .then((data) => {
                            this.util.presentAlert(this.updated_data, this.updated_data_desc, this.closeButton);
                          });
                      });
                  });
              });
          });
      });
  }

}
