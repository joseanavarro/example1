import { Injectable } from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { Globals } from "../../providers/globals/globals";
import { Device } from "@ionic-native/device";
import { isCordovaAvailable } from "../../services/is-cordova-available";
import { AppConstants } from "../../providers/app-constants/app-constants";
/**
 * Módulo de registro y notificación de informes Log
 * 
 * @export
 * @class Logger
 */
@Injectable()
export class Logger {
  clientId: string;
  devInfo: string;
  /**
 * Creates an instance of Logger.
 * @param {NGXLogger} logger 
 * @param {Globals} globals 
 * @param {Device} device 
 * @memberof Logger
 */
  constructor(
    public logger: NGXLogger,
    public globals: Globals,
    public device: Device
  ) {
    let devInf: string;
    if (isCordovaAvailable()) {
      this.logger.debug("initializeApp", "Cordova detected");

      devInf =
        " | " +
        this.device.model +
        " | " +
        this.device.version +
        " | " +
        this.device.manufacturer +
        " | " +
        this.device.uuid +
        " | " +
        this.device.serial +
        " | ";
    } else {
      devInf = " | model | version | manufacturer | uuid | serial | ";
    }
    this.devInfo = devInf;
  }
  /**
 * getDevInfo
 * Obtener información del dispositivo
 * 
 * @returns 
 * @memberof Logger
 */
  getDevInfo() {
    return this.devInfo;
  }
  /**
 * setDevInfo
 * Guardar información del dispositivo
 * 
 * @param {any} value 
 * @memberof Logger
 */
  setDevInfo(value) {
    this.devInfo = value;
  }
  /**
 * trace
 * Guardar informe de traza
 * 
 * @param {any} process 
 * @param {any} message 
 * @param {string} [info=""] 
 * @memberof Logger
 */
  trace(process, message, info = "") {
    if (AppConstants.SERVER_LOG_LEVEL <= AppConstants.LOG_LEVEL_TRACE) {
      this.clientId = AppConstants.APP_ID + this.devInfo;
    } else {
      this.clientId = " | ";
    }
    let infoStr = JSON.stringify(info);
    this.logger.trace(
      this.clientId + process + " | ",
      message,
      this.escapeSpecialChars(infoStr)
    );
  }
  /**
 * debug
 * Guardar informe de debug
 * 
 * @param {any} process 
 * @param {any} message 
 * @param {string} [info=""] 
 * @memberof Logger
 */
  debug(process, message, info = "") {
    if (AppConstants.SERVER_LOG_LEVEL <= AppConstants.LOG_LEVEL_DEBUG) {
      this.clientId = AppConstants.APP_ID + this.devInfo;
    } else {
      this.clientId = " | ";
    }
    let infoStr = JSON.stringify(info);
    this.logger.debug(
      this.clientId + process + " | ",
      message,
      this.escapeSpecialChars(infoStr)
    );
  }
  /**
 * log
 * Guardar informe de log
 * 
 * @param {any} process 
 * @param {any} message 
 * @param {string} [info=""] 
 * @memberof Logger
 */
  log(process, message, info = "") {
    if (AppConstants.SERVER_LOG_LEVEL <= AppConstants.LOG_LEVEL_LOG) {
      this.clientId = AppConstants.APP_ID + this.devInfo;
    } else {
      this.clientId = " | ";
    }
    let infoStr = JSON.stringify(info);
    this.logger.log(
      this.clientId + process + " | ",
      message,
      this.escapeSpecialChars(infoStr)
    );
  }
  /**
 * info
 * Guardar informe
 * 
 * @param {any} process 
 * @param {any} message 
 * @param {string} [info=""] 
 * @memberof Logger
 */
  info(process, message, info = "") {
    if (AppConstants.SERVER_LOG_LEVEL <= AppConstants.LOG_LEVEL_INFO) {
      this.clientId = AppConstants.APP_ID + this.devInfo;
    } else {
      this.clientId = " | ";
    }
    let infoStr = JSON.stringify(info);
    this.logger.info(
      this.clientId + process + " | ",
      message,
      this.escapeSpecialChars(infoStr)
    );
  }
  /**
 * warn
 * Guardar informe de advertencia
 * 
 * @param {any} process 
 * @param {any} message 
 * @param {string} [info=""] 
 * @memberof Logger
 */
  warn(process, message, info = "") {
    if (AppConstants.SERVER_LOG_LEVEL <= AppConstants.LOG_LEVEL_WARN) {
      this.clientId = AppConstants.APP_ID + this.devInfo;
    } else {
      this.clientId = " | ";
    }
    let infoStr = JSON.stringify(info);
    this.logger.warn(
      this.clientId + process + " | ",
      message,
      this.escapeSpecialChars(infoStr)
    );
  }
  /**
 * error
 * Guardar informe de error
 * 
 * @param {any} process 
 * @param {any} message 
 * @param {string} [info=""] 
 * @memberof Logger
 */
  error(process, message, info = "") {
    if (AppConstants.SERVER_LOG_LEVEL <= AppConstants.LOG_LEVEL_ERROR) {
      this.clientId = AppConstants.APP_ID + this.devInfo;
    } else {
      this.clientId = " | ";
    }
    let infoStr = JSON.stringify(info);
    this.logger.error(
      this.clientId + process + " | ",
      message,
      this.escapeSpecialChars(infoStr)
    );
  }
  /**
 * escapeSpecialChars
 * Eliminar caracteres especiales de una cadena JSON
 * 
 * @memberof Logger
 */
  escapeSpecialChars = function(json: string) {
    let result = json
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");

    return result;
  };
}
