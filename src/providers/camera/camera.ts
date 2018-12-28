import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateService } from "@ngx-translate/core";
import 'rxjs/add/operator/map';
import { AppConstants } from '../../providers/app-constants/app-constants';
import { CameraApiProvider } from '../../providers/camera-api/camera-api';
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";
// Declarar variable para acceder al plugin WifiWizard
declare var WifiWizard: any;

@Injectable()
export class CameraProvider {

  logt: string;
  ti: string;
  errorText: string;

  constructor(
    public http: Http,
    public cameraApi: CameraApiProvider,
    public logger: Logger,
    public globals: Globals,
    public translate: TranslateService,
    public util: UtilProvider,
    public db: DatabaseService
  ) {
    this.logt = "CameraProvider | ";
    this.ti = this.logt + "constructor";
    this.logger.debug(this.ti, "Constructor");
  }

  /**
   * Inicializar la cámara
   * 
   * @returns 
   * @memberof CameraProvider
   */
  init() {
    this.ti = this.logt + "init";

    // Pedir información de la cámara, con esta información podemos
    // saber si la cámara es la adecuada
    return new Promise((resolve, reject) => {

      this.cameraApi.getCameraInfo()
        .then((resp) => {
          this.logger.debug(this.ti, "Información correcta");
          let data = JSON.parse(resp.data);
          this.cameraApi.startSession(data.model)
            .then((data) => {
              this.globals.cameraConnected = true;
              this.db.saveSession(this.globals.camSession);
              this.logger.debug(this.ti, "Session id = ", this.globals.camSession);
              // Pedimos información de la cámara, con esta información
              // podemos comprobar la licencia de uso ***TBD***
              this.cameraApi.getStatus()
                .then((data) => {
                  this.logger.debug(this.ti, "getStatus OK");
                  this.cameraApi.setApiLevel(2)
                    .then((data) => {
                      this.logger.debug(this.ti, "SetApiLevel OK");
                      this.cameraApi.setOptions(this.globals.filter, this.globals.lat, this.globals.lon, this.globals.alt)
                        .then((data) => {
                          this.logger.debug(this.ti, "setOptions OK");
                          resolve();
                        },
                          (err) => {
                            this.globals.cameraConnected = false;
                            this.logger.error(this.ti, "Error en setOptions: ", err);
                            reject();
                          });
                    },
                      (err) => {
                        this.globals.cameraConnected = false;
                        this.logger.error(this.ti, "Error en SetApiLevel: ", err);
                        reject();
                      });
                },
                  (err) => {
                    this.globals.cameraConnected = false;
                    this.logger.error(this.ti, "Error en getStatus: ", err);
                    reject();
                  });
            },
              (err) => {
                // Ver si existe una sesión en la base de datos. Esto lo hacemos
                // por si se vuelve a ¡niciar el proceso y la sesión está
                // ya establecida (en principio poco probable)
                this.db.getOptions()
                  .then((result) => {
                    this.globals.cameraConnected = true;
                    this.globals.camSession = result.sessionId;
                    this.logger.info(this.ti, "Session id obtenida de DB = ", this.globals.camSession);
                    resolve();
                  }, () => {
                    this.globals.cameraConnected = false;
                    this.logger.error(this.ti, "Error en startSession: ", err);
                    reject();
                  });
              });
        }, (err) => {
          this.globals.cameraConnected = false;
          this.logger.error(this.ti, "Error en la cámara: ", err);
          reject();
        });
    });
  } // end function init()

  /**
    * Comprobar si existe la Wifi de la cámara y devolverla
    * 
    * @returns {Promise<any>} 
    * @memberof CameraProvider
    */
  getCameraWifi() {
    var ctx = this;
    this.ti = this.logt + "getCameraWifi";
    var netSSSID;
    return new Promise(function (resolve, reject) {
      //Scan Networks for Theta Wifi
      WifiWizard.startScan(function () {
        //Scan Started give it a few seconds to populate
        ctx.logger.debug(ctx.ti, "Wifi AP Scan Started");
        //We waited on the scan for a few seconds, now get the results.
        WifiWizard.getScanResults({
          numLevels: 5
        }, function (networks) {
          ctx.logger.debug(ctx.ti, "Got WIFI Scan Results");
          ctx.logger.trace(ctx.ti, "Networks: ", networks);
          var thetaNetworkFound = false;
          for (var i = 0; i < networks.length; i++) {
            var network = networks[i];
            if (network.SSID.includes("THETA")) {
              netSSSID = network.SSID;
              // Comprobar si la red coincide con la que está almacenada
              if (ctx.globals.cameraWifi === "") {
                ctx.globals.cameraWifi = netSSSID;
              }
              if (ctx.globals.cameraWifi === netSSSID) {
                ctx.logger.debug(ctx.ti, "Found A Theta SSID", network.SSID);
                resolve(netSSSID);
                thetaNetworkFound = true;
              }
              else {
                ctx.logger.trace(ctx.ti, "Nueva red Theta encontrada: ", netSSSID);
                reject(AppConstants.ERROR_NEW_CAMERA_WIFI_DETECTED);
                thetaNetworkFound = false;
              }
            }
          }
          if (!thetaNetworkFound) {
            ctx.logger.debug(ctx.ti, "Could Not Find THETA Wifi. Make Sure Theta Wifi Is On And In Range");
            reject(AppConstants.ERROR_CAMERA_THETA_WIFI_NOT_FOUND);
          }
        }, function () {
          ctx.logger.debug(ctx.ti, "Failed To Get Wifi AP Scan Results");
          reject(AppConstants.ERROR_CAMERA_THETA_WIFI_NOT_FOUND);
        });
      }, function () {
        ctx.logger.error(ctx.ti, "Could Not Initiate Wifi AP Scanning");
        reject(AppConstants.ERROR_CAMERA_THETA_WIFI_NOT_FOUND);
      });
    });
  }

  /**
   * Conectar a la red Wifi de la Cámara Ricoh Theta S/V
   * 
   * @param {any} SSID 
   * @returns 
   * @memberof CameraProvider
   */
  connectToThetaWifi(SSID) {
    var ctx = this;
    this.ti = this.logt + "connectToThetaWifi";
    return new Promise(function (resolve, reject) {
      //Do a little work to dig out the Wifi password from the AP Name.
      //This only works if the Wifi name is the default and starts with THETAXS and ends with .OSC
      var period_idx = SSID.indexOf('.');
      var password = SSID.substring(7, period_idx);
      var wifiwizard_connector = WifiWizard.formatWifiConfig(SSID, password, 'WPA');
      WifiWizard.addNetwork(wifiwizard_connector, function () {
        //var ctx = this;
        setTimeout(function () {
          ctx.logger.debug(ctx.ti, "Add Theta Wifi To Device");
          WifiWizard.connectNetwork(SSID, function () {
            ctx.logger.debug(ctx.ti, "Connected To Theta Wifi");
            resolve(SSID);
          }, function () {
            ctx.logger.error(ctx.ti, "Could Not Add Theta Wifi To Device");
            reject(AppConstants.ERROR_CAMERA_WIFI_CHECK_PASSWORD);
          });
        }, 1000);
      }, function () {
        ctx.logger.error(ctx.ti, "Could Not Add Theta Wifi To Device");
        reject(AppConstants.ERROR_CAMERA_WIFI_UNKNOWN_ERRROR);
      });
    });
  }

  /**
   * Habilitar acceso wifi en el móvil
   * 
   * @returns 
   * @memberof CameraProvider
   */
  enableDeviceWifi() {
    var ctx = this;
    this.ti = this.logt + "enableDeviceWifi";
    return new Promise(function (resolve, reject) {
      WifiWizard.setWifiEnabled(true, function () {
        ctx.logger.info(ctx.ti, "Device WIFI Enabled");
        resolve();
      }, function () {
        ctx.logger.error(ctx.ti, "Could Not Turn On Device Wifi.");
        reject();
      });
    });
  }

  /**
   * Desconectar Wifi de teléfono con la cámara
   * 
   * @param {any} SSID 
   * @returns 
   * @memberof CameraProvider
   */
  disconnectFromThetaWifi(SSID) {
    var ctx = this;
    this.ti = this.logt + "disconnectFromThetaWifi";
    return new Promise(function (resolve, reject) {
      WifiWizard.disconnectNetwork(SSID, function () {
        setTimeout(function () {
          ctx.logger.debug(ctx.ti, "disconnect Theta Wifi From Device");
          WifiWizard.removeNetwork(SSID, function () {
            ctx.logger.debug(ctx.ti, "Remove Theta Wifi");
            resolve();
          }, function () {
            ctx.logger.error(ctx.ti, "Could Not Remove Theta Wifi From Device");
            reject();
          });
        }, 1000);
      }, function () {
        ctx.logger.error(ctx.ti, "Could Not Disconnect Theta Wifi From Device");
        reject();
      });
    });
  };

  /**
   * Establecer la conexión Wifi o  omprobar si ya está
   * establecida
   * 
   * @returns 
   * @memberof CameraProvider
   */
  checkConnCameraWifi() {
    this.ti = this.logt + "checkConnCameraWifi";
    var that = this;
    return new Promise(function (resolve, reject) {
      //Common.showToast($translate.instant('checking_wifi_desc_txt'), 'long', 'center');
      // *** Comprobar si la conexión ya está establecida ***
      WifiWizard.isWifiEnabled(function (isEnabled) {
        if (isEnabled) {
          WifiWizard.getCurrentSSID(function (SSID) {
            that.logger.trace(that.ti, "Got Current SSID:", SSID);
            if (SSID.includes("THETA")) {
              that.logger.info(that.ti, "Es una Theta SSID");
              // Ya estamos conectados, a la salida no hay que rehacer la conexión
              resolve(SSID);
            }
            else {
              that.logger.debug(that.ti, "Not A Theta SSID - Start Scan");
              // Devolvemos 'true' por la salida de error, no estamos conectados
              // pero realmente no es un error
              reject(true);
            }
          }, function () {
            that.logger.debug(that.ti, "Could Not Read Current SSID - Likely just not connected to anything");
            // Devolvemos 'true' por la salida de error, no estamos conectados
            // pero realmente no es un error
            reject(true);
          });
        }
        else {
          that.enableDeviceWifi()
            .then(function () {
              that.logger.debug(that.ti, "Wifi habilitada");
              //Common.showToast($translate.instant('wifi_enabled_txt'), 'long', 'center');
              // Devolvemos 'true' por la salida de error, no estamos conectados
              // pero realmente no es un error
              reject(true);
            }, function (err) {
              that.logger.error(that.ti, "Error habilitando la wifi del móvil");
              // Hay que empezar de nuevo, por eso devolvemos false
              reject(false);
            });
        }
      }, function () {
        that.logger.error(that.ti, "Could Not Turn On Device Wifi.");
        // Hay que empezar de nuevo, por eso devolvemos false
        reject(false);
      });
    });
  }

  /**
   * Conectar a la Wifi de la cámara tratando todas las
   * posibilidades
   * 
   * @returns 
   * @memberof CameraProvider
   */
  connectToCameraWifi() {
    var ctx = this;
    this.ti = this.logt + "connectToCameraWifi";
    return new Promise(function (resolve, reject) {
      ctx.checkConnCameraWifi()
        .then(function (SSID) {
          // Ya estábamos conectados a la wifi de la cámara
          resolve(SSID);
        }, function (err) {
          ctx.logger.info(ctx.ti, "Wifi del móvil habilitada pero no conectada a la cámara");
          if (err) {
            // La conexión wifi está habilitada pero está conectado a
            // otra red o no está conectado
            ctx.getCameraWifi()
              .then(function (SSID) {
                //Common.showToast($translate.instant('camera_wifi_found_txt') + ' ' + SSID, 'long', 'center');
                ctx.logger.info(ctx.ti, "Obtenida wifi de la cámara:");
                ctx.connectToThetaWifi(SSID)
                  .then(function () {
                    resolve(SSID);
                  }, function (err) {
                    reject(err);
                  });
              }, function (err) {
                reject(err);
              });
          }
          else {
            // No se puede habilitar la conexión wifi
            reject(AppConstants.ERROR_PHONE_WIFI_CAN_NOT_ACTIVATE);
          }
        });
    });
  }


  /**
   * Comprobar estado de la cámara y reestablecer la conexión
   * si es necesario
   * 
   * @memberof CameraProvider
   */
  checkCamera() {
    this.ti = this.logt + "checkCamera";

    return new Promise((resolve, reject) => {
      this.cameraApi.getStatus()
        .then(
          (data) => {
            this.globals.cameraConnected = true;
            this.logger.info(this.ti, 'getStatus OK');
            resolve();
          },
          (err) => {
            this.init()
              .then(
                () => {
                  this.logger.info(this.ti, 'Init camara OK');
                  this.globals.cameraConnected = true;
                  resolve();
                },
                (err) => {
                  this.logger.error(this.ti, 'Init camara Error');
                  this.globals.cameraConnected = false;
                  reject();
                });
          });
    });
  } // end function checkCamera()

  /**
   * Actualizar filtro HDR
   * 
   * @param {boolean} value 
   * @returns 
   * @memberof CameraProvider
   */
  updateHdr(filterValue: string) {
    this.ti = this.logt + "updateHdr";
    //let options;

    // if (value === true) {
    //   options = AppConstants.PANO_INDOOR;
    //   this.logger.debug(this.ti, 'Activar HDR');
    // } else {
    //   options = AppConstants.PANO_OUTDOOR;
    //   this.logger.debug(this.ti, 'Desactivar HDR');
    // }

    return new Promise((resolve, reject) => {

      this.cameraApi.setOptions(filterValue, this.globals.lat, this.globals.lon, this.globals.alt)
        .then(
          (data) => {
            this.logger.info(this.ti, 'setOptions OK');
            resolve();
          },
          (err) => {
            this.logger.error(this.ti, 'Error en setOptions: ' + err);
            reject();
          });
    });
  } // end function updateHdr()

}
