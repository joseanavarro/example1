import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { TranslateService } from "@ngx-translate/core";
import { Platform } from "ionic-angular";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { AppConstants } from '../../providers/app-constants/app-constants';
import { DatabaseService } from "../../providers/database-service/database-service";
import { EstadoProvider } from "../../providers/estado/estado";
import { Globals } from "../../providers/globals/globals";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { TourUtilProvider } from "../../providers/tour-util/tour-util";
import { UtilProvider } from "../../providers/util/util";

@Injectable()
export class PlatformProvider {

  logt: string;
  ti: string;
  publish_tour: string;
  tour_pub_started_desc: string;
  tour_pub_started_desc2: string;
  closeButton: string;
  publish_ok: string;
  pano_is_published: string;
  contact_support: string;
  error: string;
  file_not_found: string;

  constructor(
    private logger: Logger,
    public http: HttpClient,
    public globals: Globals,
    public util: UtilProvider,
    public db: DatabaseService,
    public translate: TranslateService,
    public tourUtil: TourUtilProvider,
    public transfer: FileTransfer,
    public file: File,
    public st: EstadoProvider,
    public platform: Platform,
    public loading: LoadingProvider
  ) {
    this.logt = "PlatformProvider | ";
    this.ti = this.logt + "constructor";
    this.logger.debug(this.ti, "Proveedor creado");
  }

  /**
   * Provocar la carga de las traducciones
   * 
   * @memberof PlatformProvider
   */
  loadTexts() {
    this.translate.get("publish_tour").subscribe(value => this.publish_tour = value);
    this.translate.get("tour_pub_started_desc").subscribe(value => this.tour_pub_started_desc = value);
    this.translate.get("tour_pub_started_desc2").subscribe(value => this.tour_pub_started_desc2 = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("publish_ok").subscribe(value => this.closeButton = value);
    this.translate.get("pano_is_published").subscribe(value => this.pano_is_published = value);
    this.translate.get("error").subscribe(value => this.error = value);
    this.translate.get("contact_support").subscribe(value => this.contact_support = value);
    this.translate.get("file_not_found").subscribe(value => this.file_not_found = value);
  }

  /**
   * Iniciar el proceso de publicación de tour
   * 
   * @param {any} taskId 
   * @param {any} tourData 
   * @returns 
   * @memberof PlatformProvider
   */
  iniPublishTour(taskId, tourData, tourId) {

    this.ti = this.logt + "iniPublishTour";
    this.logger.debug(this.ti, "Entrada");
    this.loadTexts();

    return new Promise((resolve, reject) => {

      let ctx = this;
      let dataToSave = JSON.stringify(tourData);
      // Copiar archivo JSON con descripción de las tareas en la zona de fotos
      this.db.updateTaskJson(taskId, dataToSave)
        .then(() => {
          // Una vez guardado el archivo
          // Crear un registro para el final de la tarea
          this.db.addTask(taskId, '', AppConstants.TSK_END_PUB, tourId, -2, '', '', '', AppConstants.ST_PENDING)
            .then(() => {
              resolve();
            }, () => {
              reject();
            });
        }, () => {
          ctx.logger.debug(ctx.ti, "No hay datos del tour pedido");
          reject();
        });

    });
  }

  /**
  * Tarea de inicio de publicación de tour
  * 
  * @param {any} tourId 
  * @param {any} tourData 
  * @returns 
  * @memberof PlatformProvider
  */
  startPublishTask(tourId, internalTaskId, pltTaskId, jsonData) {

    this.ti = this.logt + "startPublishTask";
    this.logger.debug(this.ti, "Entrada, internal task id: ", internalTaskId);
    this.loadTexts();

    return new Promise((resolve, reject) => {

      var taskId = pltTaskId;
      let ctx = this;

      if (ctx.util.isEmpty(taskId)) {
        // No hay indentidad de tarea, seguir con el proceso
        ctx.getTaskId()
          .then((data2) => {
            taskId = data2.id_task;
            // Actualizar el campo 'taskId' en el registro del tour
            ctx.db.updatePublishTask(tourId, internalTaskId, taskId)
              .then(() => {
                ctx.logger.debug(ctx.ti, "Ya hay tarea asignada, se puede subir el tour");
                ctx.sendTourData(internalTaskId, taskId, jsonData)
                  .then(() => {
                    ctx.logger.info(ctx.ti, "Enviados a la plataforma los datos de tour");
                    resolve();
                  }, () => {
                    ctx.logger.debug(ctx.ti, "No es posible enviar los datos de tour");
                    reject();
                  });
              }, () => {
                ctx.logger.debug(ctx.ti, "No es posible actualizar el pano en la BD");
                reject();
              });
          }, () => {
            ctx.logger.debug(ctx.ti, "No es posible obtener la taskId");
            reject();
          });
      } else {
        ctx.logger.debug(ctx.ti, "Ya existe id de tarea,");
        ctx.globals.idTask = pltTaskId;
        ctx.logger.debug(ctx.ti, "Ya hay tarea asignada, se puede subir el tour");
        ctx.sendTourData(internalTaskId, taskId, jsonData)
          .then(() => {
            ctx.logger.info(ctx.ti, "Enviados a la plataforma los datos de tour");
            resolve();
          }, () => {
            ctx.logger.debug(ctx.ti, "No es posible enviar los datos de tour");
            reject();
          });
      }

    });
  }

  /**
   * Obtener desde la plataforma la identidad de la tarea
   * 
   * @returns {Promise<any>} 
   * @memberof PlatformProvider
   */
  getTaskId(): Promise<any> {

    this.ti = this.logt + "getTaskId";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {
      let apiURL = AppConstants.GET_TASK_ID_API;
      this.logger.debug(this.ti, "URL: ", apiURL);

      // Establecer cabeceras
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      // headers = headers.append('XXX', 'yyy'); --- si queremos agregar cabeceras

      // Establecer parámetros de querystring
      let params = new HttpParams();
      params = params.append('token', this.globals.token);
      // params = params.append('secondParameter', parameters.valueTwo); --- si queremos agregar parámetros

      //this.http.get(apiURL, { headers: headers, params: params })
      this.http.get(apiURL, { params: params })
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          let result = JSON.parse(JSON.stringify(res));
          if (result.error) {
            this.logger.trace(this.ti, "Error recibido: ", result.error);
            reject(result.error);
          }
          // Success          
          resolve(res);
        }, (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  /**
    * Enviar los datos de publicación del tour
    * 
    * @param {any} tourData 
    * @returns {Promise<any>} 
    * @memberof PlatformProvider
    */
  sendTourData(idTask, pltIdTask, jsonData): Promise<any> {

    this.ti = this.logt + "sendTourData";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {
      // Leer registro del tour de la base de datos

      // Establecer cabeceras
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

      // Establecer parámetros de querystring
      let params = new HttpParams();
      params = params.append('token', this.globals.token);
      params = params.append('id_task', pltIdTask);

      let apiURL = AppConstants.UPLOAD_PANO_B_API;
      this.logger.debug(this.ti, "URL: ", apiURL);

      let dataToSend = JSON.parse(jsonData);

      this.http.post(apiURL, dataToSend, { headers: headers, params: params })
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          this.logger.trace(this.ti, "Recibida respuesta: ", JSON.stringify(res));
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Lanzar orden de publicación de tour en la plataforma
   * 
   * @param {any} tourId 
   * @returns {Promise<any>} 
   * @memberof PlatformProvider
   */
  publishTour(taskId): Promise<any> {

    this.ti = this.logt + "publishTour";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      let apiURL = AppConstants.PUBLISH_API;
      this.logger.debug(this.ti, "URL: ", apiURL);

      // Establecer parámetros de querystring
      let params = new HttpParams();
      params = params.append('token', this.globals.token);
      params = params.append('id_task', taskId);

      this.http.get(apiURL, { params: params })
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          // Success          
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          resolve(res);

        }, (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  /**
   * Comprobar si el tour es vivisble en público en el portal
   * 
   * @param {*} tourId
   * @param {*} portalId
   * @returns {Promise<any>}
   * @memberof PlatformProvider
   */
  getPubHide(tourId, portalId): Promise<any> {

    this.ti = this.logt + "getPubHide";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      let apiURL = AppConstants.W2V_API_URL2 + 'publish';
      let result: boolean;
      this.logger.debug(this.ti, "URL: ", apiURL);

      // Establecer parámetros de querystring
      let params = new HttpParams();
      params = params.append('token', this.globals.token);
      params = params.append('command', '1');
      params = params.append('idTour', tourId);
      params = params.append('idPortal', portalId);

      this.http.get(apiURL, { params: params })
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          // Success          
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          if (res > 0) {
            result = true;
          } else {
            result = false;
          }
          resolve(result);
        }, (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  /**
  * hacer visible u ocultar en el portal
  * 
  * @param {*} command
  * @param {*} tourId
  * @param {*} portalId
  * @returns {Promise<any>}
  * @memberof PlatformProvider
  */
  PubHide(command, tourId, portalId): Promise<any> {

    this.ti = this.logt + "PubHide";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      let apiURL = AppConstants.W2V_API_URL2 + 'publish';
      let result: boolean;
      this.logger.debug(this.ti, "URL: ", apiURL);

      // Establecer parámetros de querystring
      let params = new HttpParams();
      params = params.append('token', this.globals.token);
      params = params.append('command', command);
      params = params.append('idTour', tourId);
      params = params.append('idPortal', portalId);

      this.http.get(apiURL, { params: params })
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          // Success          
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          resolve(res);
        }, (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  /**
  * Leer / Escribir parámetro numérico de panorama
  * 
  * @param {*} command
  * @param {*} tourId
  * @param {*} panoId
  * @param {*} par
  * @param {*} value
  * @returns {Promise<any>}
  * @memberof PlatformProvider
  */
  GetSetNUm(command, tourId, panoId, par, value): Promise<any> {

    this.ti = this.logt + "GetSetNUm";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      let apiURL = AppConstants.W2V_API_URL2 + 'getsetnum';
      let result: boolean;
      this.logger.debug(this.ti, "URL: ", apiURL);

      // Establecer parámetros de querystring
      let params = new HttpParams();
      params = params.append('token', this.globals.token);
      params = params.append('command', command);
      params = params.append('tourId', tourId);
      params = params.append('panoId', panoId);
      params = params.append('parId', par);
      params = params.append('value', value);

      this.http.get(apiURL, { params: params })
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          // Success          
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          resolve(res);
        }, (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  /**
  * Subir las fotos hacia la plataforma
  * Esto es un servicio que se dispara periódicamente
  * en segundo plano. Las fotos se suben de una en una,
  * cada vez que se dispara el servicio sólo se sube una.
  *
  * @memberof PlatformProvider
  */
  uploadProcess(): Promise<any> {
    this.ti = this.logt + "uploadProcess";

    return new Promise((resolve, reject) => {

      this.db.getAllTasks(false)
        .then((result) => {
          if (result !== null) {
            if (result.length > 0) {
              this.logger.debug(this.ti, 'Encontradas tareas de publicación');
              switch (result.item(0).tasktype) {

                case AppConstants.TSK_INIT_PUB:
                  //-------------------------------------------------------
                  // Enviar a la plataforma el json que describe la visita
                  //-------------------------------------------------------
                  this.startPublishTask(
                    result.item(0).tourid,
                    result.item(0).taskid,
                    result.item(0).plt_taskid,
                    result.item(0).pano)
                    .then(() => {
                      // Actualizar el registro en la lista de tareas
                      this.db.updateTaskStatus(result.item(0).panoid, result.item(0).taskid, AppConstants.ST_DONE)
                        .then(() => {
                          this.logger.debug(this.ti, 'Inicio de tarea de publicación correcto');
                          resolve();
                        }, () => {
                          this.logger.error(this.ti, 'ERROR de Inicio de tarea de publicación');
                          reject();
                        });
                    }, () => {
                      this.logger.error(this.ti, 'ERROR de Inicio de tarea de publicación');
                      reject();
                    });
                  break;

                case AppConstants.TSK_PANO:
                  //-------------------------------------------------------
                  // Subir panorama
                  //-------------------------------------------------------
                  let fileName = result.item(0).tourid + '_' + result.item(0).panoid + '.jpg';
                  // Actualizar estado para indicar que está subiendo
                  this.db.updateTaskStatus(result.item(0).panoid, result.item(0).taskid, AppConstants.ST_UPLOADING)
                    .then(() => {
                      // Esperar un poco para permitir que se visualice el icono de subida
                      setTimeout(() => {
                        this.panoUpload(result.item(0).panoid, result.item(0).pano, fileName, result.item(0).plt_taskid)
                          .then(() => {
                            this.db.updateTaskStatus(result.item(0).panoid, result.item(0).taskid, AppConstants.ST_DONE)
                              .then(() => {
                                this.logger.debug(this.ti, 'Subida de panorama correcto');
                                resolve();
                              }, () => {
                                this.logger.error(this.ti, 'ERROR en Subida de panorama');
                                reject();
                              });
                          }, () => {
                            this.logger.error(this.ti, 'ERROR en Subida de panorama');
                            reject();
                          });
                      }, 1000);
                    }, () => {
                      this.logger.error(this.ti, 'ERROR en Subida de panorama');
                      reject();
                    });

                  break;

                case AppConstants.TSK_END_PUB:
                  //--------------------------------------------------------------------------
                  // Enviar archivo de comando para lanzar  el procesamiento en la plataforma
                  //--------------------------------------------------------------------------
                  this.publishTour(result.item(0).plt_taskid)
                    .then(() => {
                      this.db.updateTaskStatus(result.item(0).panoid, result.item(0).taskid, AppConstants.ST_DONE)
                        .then(() => {
                          this.db.updateTaskProgress(-1, result.item(0).taskid, AppConstants.TSK_PUB_FINISHED)
                            .then(() => {
                              this.logger.debug(this.ti, 'Final de publicación correcto');
                              resolve();
                            }, () => {
                              this.logger.error(this.ti, 'ERROR en Final de publicación');
                              reject();
                            });
                        }, () => {
                          this.logger.error(this.ti, 'ERROR en Final de publicación');
                          reject();
                        });
                    }, () => {
                      this.logger.error(this.ti, 'ERROR en Final de publicación');
                      reject();
                    }); break;

                default:
                  break;
              }

            } else {
              // Finalizar proceso de publicación
              this.st.set(AppConstants.ST_IDLE);
              resolve();
            }
          } else {
            // Finalizar proceso de publicación
            this.st.set(AppConstants.ST_IDLE);
            resolve();
          }
        }, (err) => {
          this.logger.error(this.ti, 'Error leyendo tareas de publicación: ', err);
          reject();
        });

    });
  }

  /**
   * Subir panorama a la plataforma
   * 
   * @param {any} tourId 
   * @param {any} panoId 
   * @param {any} panoFile 
   * @param {any} fileName 
   * @param {any} panoName 
   * @memberof PlatformProvider
   */
  panoUpload(panoId, panoFile, fileName, taskId): Promise<any> {

    this.ti = this.logt + "panoUpload";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      // Comprobar si existe el fichero
      let filepath = panoFile.substring(0, panoFile.lastIndexOf('/') + 1);
      let filen = panoFile.substring(panoFile.lastIndexOf('/') + 1, panoFile.length);

      this.file.checkFile(filepath, filen)
        .then(() => {
          const fileTransfer: FileTransferObject = this.transfer.create();

          let options: FileUploadOptions = {
            fileKey: "file",
            fileName: fileName,
            mimeType: "image/jpeg",
            chunkedMode: false,
            params: {
              'token': this.globals.token,
              'id_task': taskId,
              'panoName': panoId
            }
          };

          let uri = encodeURI(AppConstants.UPLOAD_PANO_API);

          this.logger.debug(this.ti, "panoFile: ", panoFile);
          this.logger.debug(this.ti, "uri: ", uri);
          this.logger.debug(this.ti, "options: ", JSON.stringify(options));

          // fileTransfer.onProgress((e) => {
          //   let prg = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
          //   this.db.updateTaskProgress(panoId, taskId, prg);
          // });

          fileTransfer.upload(panoFile, uri, options)
            .then((res) => {
              this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
              if (JSON.parse(res.response).success) {
                resolve();
              } else {
                reject();
              }
            }, (err) => {
              this.logger.trace(this.ti, "Recibido error de la plataforma: ", JSON.stringify(err));
              reject();
            });
        }, (err) => {
          this.logger.debug(this.ti, "Fichero no encontrado: ", fileName);
          this.util.presentAlert(this.file_not_found, fileName, this.closeButton);
          reject(err);
        });

    });
  }

  /**
   * Actualizar localización de un panorama
   *
   * @param {number} panoId
   * @param {number} lat
   * @param {number} lon
   * @param {string} country
   * @param {string} province
   * @param {string} city
   * @param {string} address
   * @memberof PlatformProvider
   */
  updateLocation(tourId: number, panoId: number, p_lat: string, p_lon: string, p_country: string,
    p_city: string, p_address: string): Promise<any> {

    this.ti = this.logt + "updateLocation";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      // Preparar datos del POST
      var sendData = {
        token: this.globals.token,
        id_tour: tourId,
        id_pano: panoId,
        lat: p_lat,
        lon: p_lon,
        country: p_country,
        city: p_city,
        address: p_address
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      let apiURL = AppConstants.W2V_API_URL2 + 'updlocation';
      this.logger.debug(this.ti, "URL: ", apiURL);

      let body = JSON.stringify(sendData);
      this.logger.trace(this.ti, "Enviado:", body);

      this.http.post(apiURL, body, httpOptions)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          resolve();
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Actualizar campo de texto en la tabla 'Elementos' del servidor
   *
   * @param {string} tourId
   * @param {string} panoId
   * @param {string} p_tourTitle
   * @param {string} p_panoTitle
   * @param {string} p_tourDesc
   * @param {string} p_panoDesc
   * @returns {Promise<any>}
   * @memberof PlatformProvider
   */
  updateTextFields(tourId: string, panoId: string, p_tourTitle: string, p_panoTitle: string,
    p_tourDesc: string, p_panoDesc: string): Promise<any> {

    this.ti = this.logt + "updateTextFields";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      // Preparar datos del POST
      var sendData = {
        token: this.globals.token,
        lang: this.globals.lang,
        tourid: tourId,
        panoid: panoId,
        tourTitle: p_tourTitle,
        panoTitle: p_panoTitle,
        tourDesc: p_tourDesc,
        panoDesc: p_panoDesc
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      let apiURL = AppConstants.W2V_API_URL2 + 'updtexts';
      this.logger.debug(this.ti, "URL: ", apiURL);

      let body = JSON.stringify(sendData);
      this.logger.debug(this.ti, "Body: ", body);

      this.http.post(apiURL, sendData, httpOptions)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          resolve();
        }, (err) => {
          reject(err);
        });

    });
  }

  /**
   * Borrar tour virtual en el servidor
   *
   * @param {string} tourId
   * @returns {Promise<any>}
   * @memberof PlatformProvider
   */
  removeTour(tourId: string): Promise<any> {

    this.ti = this.logt + "removeTour";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      let apiURL = `${AppConstants.W2V_API_URL1}visit?id=${tourId}&token=${this.globals.token}`;

      this.logger.debug(this.ti, "URL: ", apiURL);

      this.http.delete(apiURL, httpOptions)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
          resolve();
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
   * Borrar panorama en el servidor
   *
   * @param {string} tourId
   * @returns {Promise<any>}
   * @memberof PlatformProvider
   */
  removeTourItem(tourId: string, panoId: string): Promise<any> {

    this.ti = this.logt + "removeTourItem";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      let apiURL = `${AppConstants.W2V_API_URL1}pano?id_visit=${tourId}&id_pano=${panoId}&token=${this.globals.token}`;

      this.logger.debug(this.ti, "URL: ", apiURL);

      this.http.delete(apiURL, httpOptions)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((res) => {
          if (res) {
            this.logger.trace(this.ti, "Recibida respuesta de la plataforma: ", JSON.stringify(res));
            resolve();
          } else {
            this.logger.debug(this.ti, "La escena que se quiere borrar es la única del tour");
            reject();
          }
        }, (err) => {
          reject(err);
        });
    });

  }

}
