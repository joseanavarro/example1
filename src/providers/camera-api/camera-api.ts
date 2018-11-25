import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { AppConstants } from '../../providers/app-constants/app-constants';
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";

@Injectable()
export class CameraApiProvider {

  logt: string;
  ti: string;
  cameraAPI: string;

  constructor(
    public http: HttpClient,
    public globals: Globals,
    public logger: Logger,
    public nativeHttp: HTTP
  ) {
    this.logt = "CameraProvider | ";
    this.ti = this.logt + "constructor";

    if (AppConstants.DEBUG_MODE) {
      this.cameraAPI = AppConstants.CAMERA_API_TEST;
    } else {
      this.cameraAPI = AppConstants.CAMERA_API;
    }
  }


  /**
   * Returns the Id of the last created session.
   * 
   * @returns 
   * @memberof CameraApiProvider
   */
  getId() {
    return this.globals.camSession;
  }


  /**
   * Stores the Id of the last created session.
   * 
   * @param {any} Id 
   * @memberof CameraApiProvider
   */
  setId(Id: any) {
    this.globals.camSession = Id;
  }

  /**
   * Pedir información de la cámara
   * 
   * @memberof CameraApiProvider
   * @returns {promise}
   */
  getCameraInfo(): Promise<any> {
    this.ti = this.logt + "getCameraInfo";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {
      let apiURL = this.cameraAPI + 'info';
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.http.get(apiURL)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          // Success          
          // Aquí debemos comprobar la licencia en base al
          // número de serie de la cámara
          this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", JSON.stringify(res));
          resolve(res);

        }, (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  /**
   * Iniciar sesión en la cámara
   * 
   * @param {*} model 
   * @returns {Promise<any>} 
   * @memberof CameraApiProvider
   */
  startSession(model: any): Promise<any> {
    this.ti = this.logt + "startSession";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      if (model === 'RICOH THETA V') {
        // Si la cámara es modelo Theta V, no se abre sesión
        this.globals.camModel = 'V';
        this.setId(-1);
        resolve();

      }
      else {
        // Si la cámara es Theta S, sí hay que abrir sesión

        let apiURL = this.cameraAPI + 'commands/execute';
        this.logger.debug(this.ti, "URL: ", apiURL);

        let sendData = {
          name: 'camera.startSession',
          parameters: {}
        };

        this.nativeHttp.post(apiURL, sendData, {})
          .then((resStr) => {
            this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

            let res = JSON.parse(resStr.data);

            if (res['name'] === "camera.startSession" && res['state'] === "done") {
              this.setId(res['results'].sessionId);
              resolve();
            } else {
              reject(AppConstants.ERROR_CAMERA_ERROR);
            }
          }, (err) => {
            reject(err);
          });

      }
    });
  }

  /**
   * Preguntar estado de la cámara
   * 
   * @returns {Promise<any>} 
   * @memberof CameraApiProvider
   */
  getStatus(): Promise<any> {
    this.ti = this.logt + "getStatus";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      let apiURL = this.cameraAPI + 'state';
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.nativeHttp.post(apiURL, {}, {})
        .then((resStr) => {
          this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

          let res = JSON.parse(resStr.data);
          if (resStr.data.charAt(0) === '{') {
            // This is called when the response is
            // ready
            let batteryLevel = res.state.batteryLevel;
            this.globals.batteryLevel = batteryLevel;
            // Aquí habrá que ver qué otras comprobaciones se pueden hacer
            resolve(res.data);
          } else {
            // This is called when the response
            // comes back with an error status
            reject(status);
          }
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Establecer nivel de API
   * 
   * @param {*} level 
   * @returns {Promise<any>} 
   * @memberof CameraApiProvider
   */
  setApiLevel(level: any): Promise<any> {
    this.ti = this.logt + "setApiLevel";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      if (this.globals.camSession == -1) {
        resolve();
      }
      else {

        let apiURL = this.cameraAPI + 'commands/execute';
        this.logger.debug(this.ti, "URL: ", apiURL);

        let sendData = {
          name: 'camera.setOptions',
          parameters: {
            "sessionId": this.getId(),
            "options": {
              "clientVersion": level
            }
          }
        };

        this.nativeHttp.post(apiURL, sendData, {})
          .then((resStr) => {
            this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

            let res = JSON.parse(resStr.data);
            if (res['name'] === "camera.setOptions" && res['state'] === "done") {
              resolve(res);
            } else {
              reject(AppConstants.ERROR_CAMERA_ERROR);
            }
          }, (err) => {
            reject(err);
          });

      }
    });
  }

  /**
   * Establecer opciones de disparo
   * 
   * @param {*} typ 
   * @param {*} lat 
   * @param {*} lon 
   * @returns {Promise<any>} 
   * @memberof CameraApiProvider
   */
  setOptions(typ: string, lat: number, lon: number, alt: number): Promise<any> {
    this.ti = this.logt + "setOptions";
    this.logger.debug(this.ti, "Entrada");

    //var filter;
    var sendData;
    let filter: string;

    return new Promise((resolve, reject) => {

      this.globals.filter = typ;
      if (typ === "hdr") {
        filter = 'hdr';
      } else {
        filter = 'off';
      }

      // Preparar datos del POST
      if (this.globals.camSession == -1) {
        // Opciones para Ricoh Theta V
        sendData = {
          name: 'camera.setOptions',
          parameters: {
            options: {
              _filter: filter,
              fileFormat: {
                type: 'jpeg',
                width: 5376,
                height: 2688
              },
              sleepDelay: 1800,
              gpsInfo: {
                _altitude: alt,
                _dateTimeZone: '',
                _datum: 'WGS84',
                lat: lat,
                lng: lon
              }
            }
          }
        };
      } else {
        // Opciones para Ricoh Theta S
        sendData = {
          name: 'camera.setOptions',
          parameters: {
            sessionId: this.getId(),
            options: {
              _filter: filter,
              fileFormat: {
                type: 'jpeg',
                width: 5376,
                height: 2688
              },
              sleepDelay: 1800,
              gpsInfo: {
                lat: lat,
                lng: lon
              }
            }
          }
        };
      }

      let apiURL = this.cameraAPI + 'commands/execute';
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.nativeHttp.post(apiURL, sendData, {})
        .then((resStr) => {
          this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

          let res = JSON.parse(resStr.data);
          if (res['name'] === "camera.setOptions" && res['state'] === "done") {
            resolve(res);
          } else {
            reject(AppConstants.ERROR_CAMERA_ERROR);
          }
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Realizar foto
   * 
   * @returns 
   * @memberof CameraApiProvider
   */
  takePhoto() {
    this.ti = this.logt + "takePhoto";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      // Preparar datos del POST
      var sendData = {
        name: 'camera.takePicture'
      };

      let apiURL = this.cameraAPI + 'commands/execute';
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.nativeHttp.post(apiURL, sendData, {})
        .then((resStr) => {
          this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

          let res = JSON.parse(resStr.data);
          if (res['name'] === "camera.takePicture") {
            resolve(res['id']);
          } else {
            reject(AppConstants.ERROR_CAMERA_ERROR);
          }
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Comprobar estado de realización de la foto
   * 
   * @param {any} idPhoto 
   * @returns 
   * @memberof CameraApiProvider
   */
  checkPhoto(idPhoto) {
    this.ti = this.logt + "checkPhoto";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      // Preparar datos del POST
      var sendData = {
        id: idPhoto.toString()
      };

      let apiURL = this.cameraAPI + 'commands/status';
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.nativeHttp.post(apiURL, sendData, {})
        .then((resStr) => {
          this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

          let res = JSON.parse(resStr.data);
          if (res['name'] === "camera.takePicture") {
            resolve(res);
          } else {
            reject(AppConstants.ERROR_CAMERA_ERROR);
          }
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Borrar foto
   * 
   * @param {any} Photo 
   * @returns 
   * @memberof CameraApiProvider
   */
  delPhoto(photo) {
    this.ti = this.logt + "delPhoto";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      // Preparar datos del POST
      var sendData = {
        name: 'camera.delete',
        parameters: {
          fileUrls: [photo]
        }
      };

      let apiURL = this.cameraAPI + 'commands/execute';
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.nativeHttp.post(apiURL, sendData, {})
        .then((resStr) => {
          this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

          let res = JSON.parse(resStr.data);
          if (res['name'] === "camera.delete") {
            resolve(res);
          } else {
            reject(AppConstants.ERROR_CAMERA_ERROR);
          }
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Obtener listado de fotos en la cámara, pero se usa para
   * obtener sólo la última realizada y así recibir la miniatura
   * 
   * @param {any} photo 
   * @returns 
   * @memberof CameraApiProvider
   */
  listFiles() {
    this.ti = this.logt + "listFiles";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      // Preparar datos del POST
      var sendData = {
        name: 'camera.listFiles',
        parameters: {
          fileType: 'all',
          entryCount: 1,
          maxThumbSize: 200
        }
      };

      let apiURL = this.cameraAPI + 'commands/execute';
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.nativeHttp.post(apiURL, sendData, {})
        .then((resStr) => {
          this.logger.trace(this.ti, "Recibida respuesta de la cámara: ", resStr.data);

          let res = JSON.parse(resStr.data);
          if (res['name'] === "camera.listFiles") {
            resolve(res);
          } else {
            reject(AppConstants.ERROR_CAMERA_ERROR);
          }
        }, (err) => {
          reject(err);
        });

    });
  }

}
