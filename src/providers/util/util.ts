import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Toast } from '@ionic-native/toast';
import { TranslateService } from "@ngx-translate/core";
import { AlertController, LoadingController, Platform } from "ionic-angular";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

/*
  Funciones comunes
*/
@Injectable()
export class UtilProvider {
  logt: string;
  ti: string;

  constructor(
    private logger: Logger,
    public translate: TranslateService,
    public http: HttpClient,
    public http2: Http,
    public globals: Globals,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public restApi: RestApiProvider,
    public db: DatabaseService,
    public ga: GoogleAnalytics,
    public platform: Platform,
    public file: File,
    public transfer: FileTransfer,
    public diagnostic: Diagnostic,
    public spinner: SpinnerDialog,
    public toast: Toast
  ) {
    this.logt = "UtilProvider | ";
  }

  /**
   * Obtener imagen de perfil
   *
   * @param {TourItem} item
   * @returns {string}
   * @memberof UtilProvider
   */
  getProfilePic(item: TourItem): string {
    //this.ti = this.logt + "getProfilePic";
    let profilePic: string =
      AppConstants.APP_SERVER_URL + "profilepic.aspx?u=" + item.userId;
    //this.logger.debug(this.ti, "Foto perfil: ", profilePic);
    return profilePic;
  }

  /**
   * Añadir elemento a un array sin repetir elemento
   *  
   * @param {any} arr 
   * @param {any} item 
   * @memberof UtilProvider
   */
  addToArray(arr, item) {
    let found: boolean = false;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === item.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      arr.push(item);
    }
  }

  /**
  * Mostrar mensaje emergente
  *
  * @param {string} title
  * @param {string} text
  * @param {string} bText
  * @memberof LoginPage
  */
  presentAlert(title: string, text: string, bText: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      cssClass: 'alertcss',
      buttons: [bText]
    });
    alert.present();
  }

  /**
   * Incrementar el número de visitas cuando proceda
   * 
   * @param {number} tourid 
   * @memberof UtilProvider
   */
  trackview(tourid) {

    this.ti = this.logt + "trackview";

    // Primero agregamos el registro en la base de datos local,
    // si ya existe nos devolverá error y no la registramos en el servidor
    this.db.add_track(tourid).then((data) => {
      if (data) {
        this.ga.trackEvent(AppConstants.SC_TOUR, "view", "tourid", tourid);
        this.restApi.trackview(tourid);
      }
      else {
        this.logger.debug(this.ti, "Tour ya visitado anteriormente");;
      }
    });
  }


  /**
   * Convertir goordenadas GPS a decimal
   * Los datos llegan así desde la cámara
   * "gpsLatitude":"37/1,23/1,7908/1000"
   * "gpsLongitude":"5/1,59/1,34491/1000"
   * 
   * @param {any} gpsLatLon 
   * @param {any} direction 
   * @returns 
   * @memberof UtilProvider
   */
  gpsToDec(gpsLatLon, direction) {

    var temp = gpsLatLon.split(',');
    var temp2 = temp[0].split('/');
    var deg = temp2[0] / temp2[1];
    temp2 = temp[1].split('/');
    var minutes = temp2[0] / temp2[1];
    temp2 = temp[2].split('/');
    var seconds = temp2[0] / temp2[1];

    direction.toUpperCase();
    var dd = deg + minutes / 60 + seconds / (60 * 60);
    //alert(dd);
    if (direction == "S" || direction == "W") {
      dd = dd * -1;
    } // Don't do anything for N or E
    return dd;

  }

  /**
  * Mostrar ventana de espera con mensaje
  * 
  * @memberof UtilProvider
  */
  waitWindow(title, body = '', time = 1000) {
    //Mostrar la ventana de espera
    var maxDuration;

    let loading = this.loadingCtrl.create({
      content: title + ' ' + body
    });

    if (time === 0) {
      loading.dismiss();
    } else {
      loading.present();
      maxDuration = 1000 * time;

      setTimeout(() => {
        loading.dismiss();
      }, maxDuration);
    }

  }

  /**
   * Comprobar si una cadena está vacía
   * 
   * @param {any} str 
   * @returns 
   * @memberof UtilProvider
   */
  isEmptyStr(str: string) {
    return (!str || 0 === str.length);
  }

  /**
   * Guardar imagen en la galería del teléfono
   * 
   * @param {string} url 
   * @returns 
   * @memberof UtilProvider
   */
  downloadPanorama(url: string) {
    this.ti = this.logt + "downloadPanorama";

    return new Promise((resolve, reject) => {

      // Descargar foto desde url 
      var filename = this.globals.photoName + ".jpg" //url.substring(url.lastIndexOf('/') + 1);
      var imagePath;
      if (this.platform.is('android')) {
        if (this.globals.cfgSaveToExternal) {
          imagePath = this.file.externalDataDirectory + AppConstants.PHOTO_FOLDER;
        } else {
          imagePath = this.file.dataDirectory + AppConstants.PHOTO_FOLDER;
        }
      } else {
        imagePath = this.file.dataDirectory + AppConstants.PHOTO_FOLDER;
      }
      var targetPath = imagePath + filename;

      const fileTransfer: FileTransferObject = this.transfer.create();

      fileTransfer.download(url, targetPath, true)
        .then(
          (entry) => {
            this.logger.debug(this.ti, 'download complete: ' + entry.toURL());
            resolve(targetPath);
          },
          (error) => {
            this.logger.error(this.ti, 'Error al descargar archivo: ' + error.exception);
            reject();
          });
    });
  }

  /**
   * Comprobar y pedir permisos de escritura
   * 
   * @returns 
   * @memberof UtilProvider
   */
  checkWritePermission() {
    this.ti = this.logt + "downloadPanorama";

    return new Promise((resolve) => {
      if (this.platform.is('android')) {
        this.diagnostic.isExternalStorageAuthorized()
          .then((authorized) => {
            if (authorized) {
              resolve(true);
            } else {
              this.diagnostic.requestExternalStorageAuthorization()
                .then(authorization => {
                  resolve(authorization ==
                    this.diagnostic.permissionStatus.GRANTED);
                });
            }
          });
      }
    });
  }

  /**
   * Normalizar url de archivo local
   * 
   * @memberof UtilProvider
   */
  normalizeURL(stringIn) {
    this.ti = this.logt + "normalizeURL";
    this.logger.debug(this.ti, 'in: ' + stringIn);
    let result = stringIn.replace("file:///", "cdvfile:///");
    this.logger.debug(this.ti, 'put: ' + result);
    return result;
  }

  /**
   * 
   * 
   * @param {any} val 
   * @returns 
   * @memberof UtilProvider
   */
  isEmpty(val) {
    return (val === undefined || val === null || val.length <= 0) ? true : false;
  }

  /**
   * tomar cadena evitando nulls
   *
   * @param {string} input
   * @returns {string}
   * @memberof UtilProvider
   */
  getStr(input: string): string {
    if (input !== null && input !== undefined) {
      return input;
    } else {
      return "";
    }
  }

  /**
   * Cargar configuración de usuario
   *
   * @returns {Promise<any>}
   * @memberof UtilProvider
   */
  loadConfig(): Promise<any> {
    let param;
    let value;

    return this.db.getOptions()
      .then((data) => {
        this.logger.debug('loadConfig', 'Leida configuración');

        if (data != null) {
          this.logger.debug('loadConfig', 'Existen datos de configuración');

          for (let i = 0; i < data.length; i++) {
            param = data[i].param;
            value = data[i].value;

            switch (param) {

              case 'wifiCon':
                this.globals.wifiCon = JSON.parse(value);
                break;

              case 'saveToExternal':
                this.globals.cfgSaveToExternal = JSON.parse(value);
                break;

              case 'cameraWifi':
                this.globals.cameraWifi = value;
                break;

              case 'getLocation':
                this.globals.cfgGetLocation = JSON.parse(value);
                break;

              case 'remPhotoAfter':
                this.globals.cfgDelCameraFoto = JSON.parse(value);
                break;

              case 'delTourAfterPub':
                this.globals.delTourAfterPub = JSON.parse(value);
                break;

            }
          }
        }
      })
      .catch((e) => {
        this.logger.error('loadConfig', 'Error: ', e);
      });
  }

}
