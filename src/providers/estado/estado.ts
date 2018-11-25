import { Injectable } from '@angular/core';
import { AppConstants } from '../../providers/app-constants/app-constants';
import { Logger } from "../../providers/logger/logger";


@Injectable()
export class EstadoProvider {

  estado: Number;
  logt: string;
  ti: string;

  constructor(public logger: Logger) {
    this.logt = "EstadoProvider | ";
    this.ti = this.logt + "constructor";
  }

  /**
   * Inicializar estado
   * 
   * @memberof EstadoProvider
   */
  init() {
    this.estado = AppConstants.ST_IDLE;
  }

  /**
   * Obtener el estado actual
   * 
   * @memberof EstadoProvider
   */
  get(): Number {
    this.ti = this.logt + "get";
    //this.logger.debug(this.ti, "Estado = ", this.estado.toString());
    return this.estado;
  }

  /**
   * Establecer el nuevon estado
   * 
   * @param {Number} nuevoEstado 
   * @memberof EstadoProvider
   */
  set(nuevoEstado: Number): Boolean {
    this.ti = this.logt + "set";

    this.logger.debug(this.ti, "Estado previo = ", this.estado.toString());

    // Comprobar el estado actual para saber si se puede establecer el nuevo estado
    switch (nuevoEstado) {

      case AppConstants.ST_IDLE:
        this.estado = nuevoEstado;
        this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
        return true;

      case AppConstants.ST_CONNECTING_WIFI:

        switch (this.estado) {

          case AppConstants.ST_IDLE:
            this.estado = nuevoEstado;
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return true;

          case AppConstants.ST_PUBLISHING:
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return false;

          default:
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return true;
        }

      case AppConstants.ST_CONNECTING_CAMERA:

        switch (this.estado) {

          case AppConstants.ST_IDLE:
            this.estado = nuevoEstado;
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return true;

          case AppConstants.ST_PUBLISHING:
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return false;

          default:
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return true;
        }

      case AppConstants.ST_CAMERA_CONNECTED:
        this.estado = nuevoEstado;
        this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
        return true;

      case AppConstants.ST_CAMERA_DISCONNECTING:
        this.estado = nuevoEstado;
        this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
        return true;

      case AppConstants.ST_INIT_PUBLISH:

        switch (this.estado) {

          case AppConstants.ST_IDLE:
            this.estado = nuevoEstado;
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return true;

          default:
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return false;
        }

      case AppConstants.ST_PUBLISHING:

        switch (this.estado) {

          case AppConstants.ST_IDLE:
            this.estado = nuevoEstado;
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return true;

          default:
            this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
            return false;
        }
      default:
        this.estado = nuevoEstado;
        this.logger.debug(this.ti, "Estado nuevo = ", this.estado.toString());
        return true;

    }
  }

}
