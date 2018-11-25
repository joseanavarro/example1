import { Component } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppConstants } from '../../providers/app-constants/app-constants';
import { CameraProvider } from '../../providers/camera/camera';
import { EstadoProvider } from "../../providers/estado/estado";
import { GeoProvider } from "../../providers/geo/geo";
import { Globals } from "../../providers/globals/globals";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  cameraConnected: boolean;
  cameraConnecting: boolean;
  cameraError: boolean;
  tries: number;
  task: any;
  logt: string;
  ti: string;
  connecting: string;
  checking_wifi: string;
  err_camera: string;
  closeButton: string;
  errmsg: string;
  SSID: string;
  conn: boolean;
  percentBatteryLevel: number;
  camera_control: string;
  wifiCon: boolean;

  retries: number = 2;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public globals: Globals,
    public translate: TranslateService,
    public util: UtilProvider,
    public camService: CameraProvider,
    public diagnostic: Diagnostic,
    public geo: GeoProvider,
    public st: EstadoProvider,
    public openNativeSettings: OpenNativeSettings,
    public loading: LoadingProvider
  ) {
    this.logt = "CameraPage | ";
    this.ti = this.logt + "constructor";

    this.translate.get("connecting_camera").subscribe(value => this.connecting = value);
    this.translate.get("checking_wifi_desc").subscribe(value => this.checking_wifi = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("err_camera").subscribe(value => this.err_camera = value);
    this.translate.get("connecting_camera_control").subscribe(value => this.camera_control = value);

    // Comprobar si hay permisos para escribir en el almacenamiento externo,
    // si no lo hay, pedirlo
    this.util.checkWritePermission().then(permission => {
      this.logger.debug(this.ti, 'Permisos de escritura concedidos');
    }, error => {
      this.logger.debug(this.ti, 'No se conceden permisos de escxritura: ' + error);
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
    this.tries = 0;
    this.cameraError = false;
    if (this.st.get() === AppConstants.ST_CAMERA_CONNECTED) {
      this.cameraConnected = true;
    } else {
      this.cameraConnected = false;
    }
    this.wifiCon = this.globals.wifiCon;

    this.percentBatteryLevel = this.globals.batteryLevel * 100;
    if (this.globals.cfgGetLocation) {
      // Determinar la localización
      this.geo.findLocation().then((loc) => {
        this.globals.lat = loc.latitude;
        this.globals.lon = loc.longitude;
        this.globals.alt = loc.altitude;
        this.ga.trackEvent(AppConstants.SC_LOCATION, "found", loc.toString());
        this.logger.debug(this.ti, "Obtenida localización");
      }, (error) => {
        // No se puede obtener la localización, mostrar mensaje de error
        this.ga.trackEvent(AppConstants.SC_LOCATION, "not found");
        this.logger.debug(this.ti, "No se puede obtener la localización, mostrar mensaje de error: ", error);
      })
    }
  }

  /**
  * Connect with the 360 camera
  * 
  * @returns 
  * @memberof CameraPage
  */
  connectCameraAPI() {
    this.ti = this.logt + "connectCameraAPI";

    this.geo.findLocation()
      .then((pos) => {
        this.globals.lat = pos.latitude;
        this.globals.lon = pos.longitude;
      }, (err) => {
        this.logger.debug(this.ti, "findLocation Error");
      });

    return new Promise((resolve, reject) => {
      this.camService.init()
        .then(() => {
          this.logger.debug(this.ti, "Init camara OK");
          this.conn = true;
          this.cameraConnected = true;
          this.globals.cameraConnected = true;
          this.percentBatteryLevel = this.globals.batteryLevel * 100;
          resolve();
        },
          (err) => {
            this.logger.debug(this.ti, "Init camara Error");
            this.cameraConnected = false;
            this.globals.cameraConnected = false;
            reject(err);
          });
    });
  }

  /**
   * Iniciar la conexión con la cámara
   * 
   * @memberof CameraPage
   */
  startConnection() {
    this.ti = this.logt + "startConnection";
    this.logger.debug(this.ti, "Entrar en procedimiento ");
    this.cameraError = false;

    this.logger.debug(this.ti, "Is Android ", this.platform.is('android').toString());

    if (this.platform.is('android') && this.globals.wifiCon) {
      //--------------------------------------------
      // Conectar por wifi con la cámara en Android
      //--------------------------------------------
      this.loading.presentLoader(this.connecting + ' ' + this.checking_wifi, 20);
      //----------------------------------------------------------------------
      // Lanzar tarea en segundo plano para comprobar conexión con la cámara
      // e intentar conectar con ella
      //----------------------------------------------------------------------
      this.task = setInterval(() => {
        // Comprobar estado de conexión
        if (this.st.set(AppConstants.ST_CONNECTING_WIFI) && this.tries < 8) {

          this.logger.info(this.ti, "INTENTO DE CONEXIÓN ", this.tries.toString());
          this.camService.connectToCameraWifi()
            .then((SSID) => {
              this.SSID = JSON.stringify(SSID);
              this.loading.presentLoader(this.connecting + ' ' + this.camera_control, 5);
              let n: any;
              // Ejecutar la conexión al API de la cámara pasado un segundo
              n = setTimeout(() => {
                this.st.set(AppConstants.ST_CONNECTING_CAMERA);
                this.connectCameraAPI()
                  .then(() => {
                    this.logger.debug(this.ti, "Cámara conectada");
                    this.st.set(AppConstants.ST_CAMERA_CONNECTED);
                    clearInterval(this.task);
                  },
                    (err) => {
                      this.logger.debug(this.ti, "Error conectando con la wifi de la cámara");
                      this.st.set(AppConstants.ST_IDLE);
                      this.tries += 1;
                      this.errmsg = err;
                    });
              }, 1000);
            },
              (err) => {
                this.logger.debug(this.ti, "Error conectando con la wifi de la cámara");
                this.st.set(AppConstants.ST_IDLE);
                this.tries += 1;
                this.errmsg = err;
              });
        }
        if (this.st.get() !== AppConstants.ST_CAMERA_CONNECTED && this.tries >= 8) {
          clearInterval(this.task);
          this.tries = 0;
          this.loading.presentLoader('', 0);;
          this.translate.get(this.errmsg).subscribe(value => {
            let msg = value;
            this.util.presentAlert(this.err_camera, msg, this.closeButton);
          });
        }
      }, 1000 * 2);

    } else {
      this.loading.presentLoader(this.connecting + ' ' + this.camera_control, 5);
      //--------------------------------------------------------------
      // Conectar cámara,  La red Wifi debe estar ya conectada
      //--------------------------------------------------------------
      let n: any;
      // Ejecutar la conexión al API de la cámara pasado un segundo
      n = setTimeout(() => {
        this.st.set(AppConstants.ST_CONNECTING_CAMERA);
        this.connectCameraAPI()
          .then(() => {
            this.loading.presentLoader('', 0);;
            this.cameraError = false;
            this.logger.debug(this.ti, "Cámara conectada");
            this.st.set(AppConstants.ST_CAMERA_CONNECTED);
            clearInterval(this.task);
          },
            (err) => {
              this.loading.presentLoader('', 0);;
              this.cameraError = true;
              this.loading.presentLoader(this.connecting + ' ' + this.camera_control, 5);
              this.logger.debug(this.ti, "Error conectando con la cámara");
              this.st.set(AppConstants.ST_IDLE);
              this.tries += 1;
              this.errmsg = err;
            });
      }, 1000);
    }
  }

  /**
   * Iniciar nuevo tpour virtual
   * 
   * @memberof CameraPage
   */
  startNewTour() {
    this.navCtrl.push("NewTourPage");
  }

  /**
   * Abrir conexiones wifi
   *
   * @memberof CameraPage
   */
  openWifi() {
    this.openNativeSettings.open("wifi");
  }

  /**
   * Continuar tour existente
   *
   * @memberof CameraPage
   */
  continueTour() {
    this.navCtrl.push("ContinueTourPage");
  }

  /**
   * Realizar tour con un solo panorama
   *
   * @memberof CameraPage
   */
  startSingleTour() {
    this.navCtrl.push("SinglePanoPage");
  }

}
