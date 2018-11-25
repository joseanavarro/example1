import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { TranslateService } from "@ngx-translate/core";
import 'rxjs/add/operator/map';
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@Injectable()
export class TourUtilProvider {
  logt: string;
  ti: string;

  constructor(
    public logger: Logger,
    public restApi: RestApiProvider,
    public globals: Globals,
    public db: DatabaseService,
    public util: UtilProvider,
    public translate: TranslateService,
    public file: File
  ) {
    this.logt = "TourUtilProvider | ";
    this.ti = this.logt + "constructor";
  }

  /**
   * Borrar tour local
   * 
   * @param {any} tour_id 
   * @returns 
   * @memberof TourUtilProvider
   */
  deleteTour(tour_id: number) {
    this.ti = this.logt + "deleteTour";
    var panosToDelete = [];
    var fileToDelete;
    var pathToDelete0;
    //var pathToDelete;

    this.logger.debug(this.ti, "Borrar el tour");

    return new Promise((resolve, reject) => {
      // Leer los archivos de los panoramas del tour
      this.db.getPanos(tour_id)
        .then((result) => {
          panosToDelete = result;
          this.db.removeTour(tour_id)
            .then(() => {
              this.db.removeTourData(tour_id)
                .then((result) => {
                  // Leer los archivos de los panoramas del tour
                  for (var i = 0; i < panosToDelete.length; i++) {
                    if (panosToDelete['item'](i).panoid !== 0) {
                      pathToDelete0 = panosToDelete['item'](i).pano;
                      fileToDelete = pathToDelete0.split('\\').pop().split('/').pop();
                      this.logger.info(this.ti, 'Borrar archivo = ' + pathToDelete0);
                      pathToDelete0 = pathToDelete0.replace(fileToDelete, '');
                      this.file.removeFile(pathToDelete0, fileToDelete)
                        .then(() => this.logger.debug(this.ti, "Fichero borrado: " + pathToDelete0 + "/" + fileToDelete))
                        .catch((err) => {
                          this.logger.error(this.ti, "Error borrando fichero: " + pathToDelete0 + "/" + fileToDelete, err);
                        });
                    }
                  }
                  // Aquí se devuelve el control mientras los ficheros se van borrando en el bucle ... tal vez esto
                  // haya que cambiarlo, hay que probar cómo funciona
                  resolve();
                }, () => {
                  this.globals.tourTitle = '';
                  this.logger.error(this.ti, 'Error en lectura BD');
                  reject();
                });
            }, () => {
              this.globals.tourTitle = '';
              this.logger.error(this.ti, 'Error en lectura BD');
              reject();
            });
        }, () => {
          this.globals.tourTitle = '';
          this.logger.error(this.ti, 'Error en lectura BD');
          reject();
        });
    });
  }

}
