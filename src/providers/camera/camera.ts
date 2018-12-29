import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateService } from "@ngx-translate/core";
import 'rxjs/add/operator/map';
import { CameraApiProvider } from '../../providers/camera-api/camera-api';
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

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
