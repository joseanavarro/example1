import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Platform } from "ionic-angular";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { Logger } from "../../providers/logger/logger";

/**
 * El objeto Login se almacena en la base de datos Sqlite
 * Tiene métodos para crear, borrar, modificar y consultar
 *
 * @export
 * @class Login
 */
@Injectable()
export class DatabaseService {
  public database: SQLiteObject;
  public dbReady = new BehaviorSubject<boolean>(false);
  logt: string;
  logger: Logger;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    public logg: Logger
  ) {
    this.logt = "DatabaseService | ";
    let ti: string = this.logt + "constructor";
    this.logger = logg;
    this.logger.info(ti, "Servicio DatabaseService creado");
    //---------------------------
    // Inicializar base de datos
    //---------------------------
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: AppConstants.APP_ID + ".db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;

          //this.removeTables().then(() => {  // ***** Ocultar si no es en desarrollo
          this.createTables().then(() => {
            // Continuamos
            this.dbReady.next(true);
          });
          //});    // ***** Ocultar si no es en desarrollo
        });
    });
  }

  /**
   * createTables()
   * Crear las tablas de la App
   *
   * @private
   * @returns {Promise<any>}
   * @memberof DatabaseService
   */
  private createTables(): Promise<any> {
    let ti: string = this.logt + "createTables";
    let promises: Array<any> = [];
    const that = this;
    //----------------------------------------------------
    // Crear la base de datos con los datos de DB_CONFIG
    // ** Iterar por todas las tablas
    //----------------------------------------------------
    AppConstants.DB_CONFIG.tables.forEach(function (table) {
      let columns = [];
      //-- Iterar por cada columna de cada tabla y añadirla
      // en la variable 'columns' --
      table.columns.forEach(function (column) {
        columns.push(column.name + " " + column.type);
      });
      //-- Construir la sentencia sql --
      let query =
        "CREATE TABLE IF NOT EXISTS " +
        table.name +
        " (" +
        columns.join(",") +
        ")";
      that.logger.trace(ti, "query: " + query);
      //-- Ejecutar cada comando sql en una promise del array --
      promises.push(
        new Promise(function (resolve, reject) {
          that.database
            .executeSql(query, [])
            .then(() => {
              that.logger.info(ti, "Tabla creada correctamente: ", query);
              resolve();
            })
            .catch(err => {
              that.logger.error(ti, "Error creando tabla: ", err);
              reject(err);
            });
        })
      );
    });
    //-- Devolver todas las promises
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    return Promise.all(promises);
  }

  /**
   * removeTables()
   * Borrar las tablas de la App  **** Sólo para desarrollo
   *
   * @private
   * @returns {Promise<any>}
   * @memberof DatabaseService
   */
  private removeTables(): Promise<any> {
    let ti: string = this.logt + "removeTables";
    let promises: Array<any> = [];
    const that = this;

    AppConstants.DB_CONFIG.tables.forEach(function (table) {

      //-- Construir la sentencia sql --
      let query = "DROP TABLE " + table.name;
      that.logger.trace(ti, "query: " + query);
      //-- Ejecutar cada comando sql en una promise del array --
      promises.push(
        new Promise(function (resolve, reject) {
          that.database
            .executeSql(query, [])
            .then(() => {
              that.logger.info(ti, "Tabla borrada correctamente: ", query);
              resolve();
            })
            .catch(err => {
              that.logger.error(ti, "Error borrando tabla: ", err);
              reject(err);
            });
        })
      );
    });
    //-- Devolver todas las promises
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    return Promise.all(promises);
  }


  /**
   * isReady()
   * Indica si la base de datos está lista
   *
   * @private
   * @valuesof DatabaseService
   */
  private isReady(): Promise<any> {
    return new Promise((resolve, reject) => {
      //-----------------------------
      // if dbReady is true, resolve
      //-----------------------------
      if (this.dbReady.getValue()) {
        resolve();
      } else {
        //-------------------------------------------------------
        // otherwise, wait to resolve until dbReady returns true
        //-------------------------------------------------------
        this.dbReady.subscribe(ready => {
          if (ready) {
            resolve();
          }
        });
      }
    });
  }

  //-------------------------------------------------------------------------------------
  // Métodos de acceso a base de datos local
  //-------------------------------------------------------------------------------------

  //****************************************************/
  //******************** TRACKS ************************/
  //****************************************************/

  /**
   * Añadir registro en la tabla trackview
   *
   * @param {number} tourid 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  add_track(tourid: number): Promise<any> {
    let ti: string = this.logt + "add_track";
    let parameters = [
      tourid
    ];
    let query: string =
      "INSERT INTO Trackview (tourid) VALUES (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          return true;
        },
        err => {
          this.logger.debug(ti, "Error: ", err);
          return false;
        }
      );
    });
  }

  /**
  * Leer registro en la tabla Trackview
  *
  * @param {number} id
  * @returns
  * @memberof Login
  */
  get_track(id: number): Promise<any> {
    let ti: string = this.logt + "get_track";
    let parameters = [id];
    let query: string =
      "SELECT * FROM Trackview WHERE tourid = (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          if (data.rows.length > 0) {
            return data.rows.item(0);
          } else {
            return null;
          }
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }

  /**
   * Borrar todos los registros de la tabla Trackview
   *
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  remove_tracks(): Promise<any> {
    let ti: string = this.logt + "remove_tracks";
    let query: string = "DELETE FROM Trackview";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, []).then(
        data => {
          this.logger.debug(ti, "Borrados todos los registros de Trackview");
          return data;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }

  //*****************************************************/
  //******************** OPTIONS ************************/
  //*****************************************************/

  /**
   * Modificar valor de configuración
   * 
   * @param {*} param
   * @param {*} value
   * @returns {Promise<any>}
   * @memberof DatabaseService
   */
  saveOption(param, value): Promise<any> {
    let ti: string = this.logt + "saveOption";
    let query;
    // Primero buscamos si existe el registro
    return new Promise((resolve, reject) => {
      this.getOption(param)
        .then((data) => {
          if (data == null) {
            query = `INSERT INTO ${AppConstants.TABLE_OPTIONS} (value, param) VALUES (?,?)`;
          } else {
            query = `UPDATE ${AppConstants.TABLE_OPTIONS} SET value = (?)  WHERE param = (?)`;
          }
          let parameters = [value, param];

          this.logger.trace(ti, "SQL: ", query);
          this.logger.trace(ti, "Values: ", parameters.toString());

          this.isReady().then(() => {
            this.database.executeSql(query, parameters)
              .then((data) => {
                resolve(data);
              },
                (err) => {
                  this.logger.error(ti, "Error: ", err);
                  reject(err);
                }
              );
          });
        });
    });
  }

  /**
   * Leer un registro en la tabla Options
   *
   * @returns
   * @memberof Login
   */
  getOption(param): Promise<any> {
    let ti: string = this.logt + "getOption";
    let parameters = [param];
    let query: string = `SELECT * FROM ${AppConstants.TABLE_OPTIONS} WHERE param = (?)`;
    this.logger.trace(ti, "SQL: ", query);

    return new Promise((resolve) => {

      this.isReady().then(() => {
        this.database.executeSql(query, parameters)
          .then((data) => {
            if (data.rows.length > 0) {
              this.logger.trace(ti, "Result: ", data.rows.item(0));
              resolve(data.rows.item(0));
            } else {
              this.logger.trace(ti, "Sin datos, devolver null");
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              resolve(null);
            }
          );
      });
    });
  }

  /**
   * Leer un registro en la tabla Options
   *
   * @returns
   * @memberof Login
   */
  getOptions(): Promise<any> {
    let ti: string = this.logt + "getOptions";
    let parameters = [];
    let result = [];
    let query: string = `SELECT * FROM ${AppConstants.TABLE_OPTIONS}`;
    this.logger.trace(ti, "SQL: ", query);

    return new Promise((resolve) => {

      this.isReady().then(() => {
        this.database.executeSql(query, parameters)
          .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
              result.push({
                param: data.rows.item(i).param,
                value: data.rows.item(i).value
              })
            }
            if (data.rows.length > 0) {
              resolve(result);
            } else {
              this.logger.trace(ti, "Sin datos, devolver null");
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              resolve(null);
            }
          );
      });
    });
  }

  /**
   * Modificar registro en la tabla Login
   * 
   * @param {any} premTourAfter 
   * @param {any} premPhotoAfter 
   * @param {any} ploc 
   * @param {any} wifiCam 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  saveSession(sessionId): Promise<any> {
    let ti: string = this.logt + "saveSession";

    let parameters = [sessionId];

    let query: string = `UPDATE ${AppConstants.TABLE_OPTIONS} SET sessionId = (?) WHERE id = 1`;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  //*****************************************************/
  //******************** TOURS **************************/
  //*****************************************************/

  /**
   * Obtener el último tour realizado
   * 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  getLastTour(): Promise<any> {
    let ti: string = this.logt + "getLastTour";
    let parameters = [];
    let query: string =
      "SELECT * FROM Tours ORDER BY tourId DESC LIMIT 1";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(query, parameters)
          .then((data) => {
            if (data.rows.length > 0) {
              resolve(data.rows.item(0));
            } else {
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  /**
  * Obtener el último panorama en un tour 
  * 
  * @returns {Promise<any>} 
  * @memberof DatabaseService
  */
  getLastPanoInTour(tourId: number): Promise<any> {
    let ti: string = this.logt + "getLastPanoInTour";
    let parameters = [tourId];
    let query: string =
      "SELECT * FROM Tours WHERE tourId = (?) ORDER BY panoId DESC LIMIT 1";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(query, parameters)
          .then((data) => {
            if (data.rows.length > 0) {
              resolve(data.rows.item(0));
            } else {
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  /**
   * Obtener todos los tours
   * 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  getAllTours(): Promise<any> {
    let ti: string = this.logt + "getAllTours";
    let query: string =
      "SELECT * FROM Tours WHERE panoid = 0";
    this.logger.trace(ti, "SQL: ", query);

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(query, [])
          .then((data) => {
            if (data.rows.length > 0) {
              if (AppConstants.DEBUG_MODE) {
                // Listar los registros leidos
                for (let i = 0; i < data.rows.length; i++) {
                  this.logger.debug(ti, data.rows.item(i));
                }
              }
              resolve(data.rows);
            } else {
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  /**
  * Obtener lista de panoramas
  * 
  * @returns {Promise<any>} 
  * @memberof DatabaseService
  */
  getPanos(tourId: number, status: number = -1): Promise<any> {
    let ti: string = this.logt + "getPanos";
    let sqlquery;
    let parameters = [];

    if (status === -1) {
      sqlquery = "SELECT * FROM Tours WHERE tourId = (?)";
      parameters = [tourId];
    } else {
      sqlquery = "SELECT * FROM Tours WHERE tourId = (?) AND status = (?) AND panoid <> 0";
      parameters = [tourId, status];
    }
    this.logger.trace(ti, "SQL: ", sqlquery);

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(sqlquery, parameters)
          .then((data) => {
            if (data.rows.length > 0) {
              if (AppConstants.DEBUG_MODE) {
                // Listar los registros leidos
                for (let i = 0; i < data.rows.length; i++) {
                  this.logger.debug(ti, data.rows.item(i));
                }
              }
              resolve(data.rows);
            } else {
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  /**
   * Añadir registro en la tabla Tours
   * 
   * @param {any} tourId 
   * @param {any} panoId 
   * @param {any} name 
   * @param {any} pano 
   * @param {any} lat 
   * @param {any} lon 
   * @param {any} status 
   * @param {any} thumbnail 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  addTour(tourId, panoId, name, pano, lat, lon, status, thumbnail): Promise<any> {
    let ti: string = this.logt + "addTourData";

    var parameters = [tourId, panoId, name, pano, lat, lon, status, thumbnail];

    let query: string =
      `INSERT INTO Tours (tourId, panoId, name, pano, lat, lon, status, thumbnail) VALUES (?,?,?,?,?,?,?,?)`;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
   * Actualizar registro para finalizar un tour
   * 
   * @param {any} tourId 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  finishTour(tourId): Promise<any> {
    let ti: string = this.logt + "finishTour";
    var parameters = [tourId];
    let query: string = "UPDATE Tours SET status = 1 WHERE tourId = (?) AND panoId = 0";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Finalizado el tour " + tourId);
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
   * Completar tour para que se pueda repetir la subida
   * 
   * @param {any} tourId 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  completeTourRepeat(tourId): Promise<any> {
    let ti: string = this.logt + "completeTourRepeat";
    var parameters = [tourId];
    let query: string = "UPDATE Tours SET status = 4, pano = '' WHERE tourId = (?) AND panoId = 0";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      this.database.executeSql(query, parameters)
        .then((data) => {
          query = "UPDATE Tours SET status = 1 WHERE tourId = (?) AND panoId <> 0";
          return this.database.executeSql(query, parameters)
            .then((data) => {
              this.logger.debug(ti, "Actualizado el tour " + tourId);
              return data;
            },
              (err) => {
                this.logger.error(ti, "Error: ", err);
                return err;
              })
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          });
    });
  }

  // Completar tour para que se pueda repetir la subida
  // self.completeTourRepeat = function (tourid) {
  // 	var parameters = [tourid];
  // 	DBA.query("UPDATE Tours SET status = 4, pano = '' WHERE tourId = (?) AND panoId = 0", parameters);
  // 	return DBA.query("UPDATE Tours SET status = 1 WHERE tourId = (?) AND panoId <> 0", parameters);
  // };

  /**
  * Actualizar registro 
  * 
  * @param {any} tourId 
  * @returns {Promise<any>} 
  * @memberof DatabaseService
  */
  updatePanoStatus(tourid, pano, panoid, status): Promise<any> {
    let ti: string = this.logt + "finishTour";
    let parameters: any[] = []
    let query: string;
    if (pano === 0) {
      parameters = [status, tourid, panoid];
      query = "UPDATE Tours SET status = (?) WHERE tourId = (?) AND panoId = (?)";
    } else {
      parameters = [pano, status, tourid, panoid];
      query = "UPDATE Tours SET pano = (?), status = (?) WHERE tourId = (?) AND panoId = (?)";
    }

    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Actualizado el pano " + panoid);
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
   * Actualizar pano en un tour
   * 
   * @param {any} act_tourid 
   * @param {any} panoid 
   * @param {any} new_tourid 
   * @param {any} new_panoid 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  UpdatePanoInTour(act_tourid, panoid, new_tourid, new_panoid): Promise<any> {
    let ti: string = this.logt + "UpdatePanoInTour";
    var parameters = [new_tourid, new_panoid, act_tourid, panoid];
    let query: string = "UPDATE Tours SET tourid = (?), panoId = (?) WHERE tourId = (?) AND panoId = (?)";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Pano en tour actualizado");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }


  /**
   * Actualizar título del tour en el primer registro (panorama = 0)
   * 
   * @param {any} name 
   * @param {any} tourid 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  UpdateTourTitle(name, tourid): Promise<any> {
    let ti: string = this.logt + "UpdateTourTitle";
    var parameters = [name, tourid];
    let query: string = "UPDATE Tours SET name = (?) WHERE tourId = (?) AND panoId = 0";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Pano actualizado");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
   * Actualizar título del panorama
   * 
   * @param {any} panoid 
   * @param {any} tourid 
   * @param {any} name
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  editPanoName(panoid, tourid, name): Promise<any> {
    let ti: string = this.logt + "editPanoName";
    var parameters = [name, tourid, panoid];
    let query: string = "UPDATE Tours SET name = (?) WHERE tourId = (?) AND panoId = (?)";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Pano actualizado");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
  * Actualizar título del tour en el primer registro (panorama = 0)
   * 
   * @param {any} tourId 
   * @param {any} panoId 
   * @param {any} name 
   * @param {any} pano 
   * @param {any} lat 
   * @param {any} lon 
   * @param {any} status 
   * @param {any} thumbnail 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  editTourItem(tourId, panoId, name, pano, lat, lon, status, thumbnail): Promise<any> {
    let ti: string = this.logt + "UpdateTourItem";
    var parameters = [name, pano, lat, lon, status, thumbnail, tourId, panoId];

    let query: string = "UPDATE Tours SET name = (?), pano = (?), lat = (?), lon = (?), status = (?) , thumbnail = (?)  WHERE tourId = (?) AND panoId = (?)";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Pano actualizado");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
  * Borrar tour de la tabla Tours
  * 
  * @param {number} tourId 
  * @returns {Promise<any>} 
  * @memberof DatabaseService
  */
  removeTour(tourId: number): Promise<any> {
    let ti: string = this.logt + "removeTour";

    let parameters = [tourId];

    let query: string = `DELETE FROM Tours WHERE tourId = (?)`;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
  * Borrar item de un tour
  * 
  * @param {number} tourId 
  * @returns {Promise<any>} 
  * @memberof DatabaseService
  */
  removeTourItem(tourId: number, item: number): Promise<any> {
    let ti: string = this.logt + "removeTour";

    let parameters = [tourId, item];

    let query: string = `DELETE FROM Tours WHERE tourid = (?) AND panoId = (?)`;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
   * Obtener los datos de un panorama
   * 
   * @param {any} tourId 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  getPanoData(tourId, panoId): Promise<any> {
    let ti: string = this.logt + "getPanoData";
    let parameters = [tourId, panoId];
    let query: string =
      "SELECT * FROM Tours WHERE tourid = (?) AND panoid = (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(query, parameters)
          .then((data) => {
            if (data.rows.length) {
              resolve(data.rows.item(0));
            } else {
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  //*****************************************************/
  //******************** TOURDATA ***********************/
  //*****************************************************/

  /**
   * Añadir datos globales de un tour
   * 
   * @param {any} tourId 
   * @param {any} title 
   * @param {any} description 
   * @param {any} lat 
   * @param {any} lon 
   * @param {any} street 
   * @param {any} postal_code 
   * @param {any} city 
   * @param {any} country 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  addTourData(tourId, title, description, lat, lon, street, postal_code, city, country): Promise<any> {
    let ti: string = this.logt + "addTourData";

    var parameters = [tourId, title, description, lat, lon, street, postal_code, city, country];

    let query: string =
      `INSERT INTO TourData (tourid, title, description, lat, lon, street, postal_code, city, country) VALUES (?,?,?,?,?,?,?,?,?)`;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
 * Actualizar datos de un tour
 *     
 * @param {any} tourId 
 * @param {any} title 
 * @param {any} description 
 * @param {any} lat 
 * @param {any} lon 
 * @param {any} street 
 * @param {any} postal_code 
 * @param {any} city 
 * @param {any} country 
 * @returns {Promise<any>} 
 * @memberof DatabaseService
 */
  UpdateTourData(tourId, title, description, lat, lon, street, postal_code, city, country): Promise<any> {
    let ti: string = this.logt + "UpdateTourData";

    var parameters = [title, description, lat, lon, street, postal_code, city, country, tourId];

    let query: string =
      `UPDATE TourData SET title = (?), description = (?), lat = (?), lon = (?), street = (?), postal_code = (?), city = (?), country = (?) WHERE tourId = (?) `;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
  * Borrar tour de la tabla TourData
  * 
  * @param {number} tourId 
  * @returns {Promise<any>} 
  * @memberof DatabaseService
  */
  removeTourData(tourId: number): Promise<any> {
    let ti: string = this.logt + "removeTourData";

    let parameters = [tourId];

    let query: string = `DELETE FROM TourData WHERE tourid = (?)`;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
  * Obtener datos de todos los tours, excepto el indicado si hay valor de entrada
  * 
   * @param {number} [excp=-1] 
   * @returns {Promise<any>} 
   * @memberof DatabaseService
   */
  getAllTourData(excp: number = -1): Promise<any> {
    let ti: string = this.logt + "getAllTourData";
    let query: string;
    let parameters = [];
    let result = [];

    if (excp !== -1) {
      parameters = [excp];
      query = "SELECT * FROM TourData WHERE tourid <> (?) ORDER BY rowid ASC";
    } else {
      query = "SELECT * FROM TourData ORDER BY rowid ASC";
    }
    this.logger.trace(ti, "SQL: ", query);

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(query, parameters)
          .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
              result.push({
                tourid: data.rows.item(i).tourid,
                title: data.rows.item(i).title,
                description: data.rows.item(i).description,
                lat: data.rows.item(i).lat,
                lon: data.rows.item(i).lon,
                street: data.rows.item(i).street,
                postal_code: data.rows.item(i).postal_code,
                city: data.rows.item(i).city,
                country: data.rows.item(i).country
              })
            }
            resolve(result);
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  /**
 * Obtener los datos de un tour
 * 
 * @param {any} tourId 
 * @returns {Promise<any>} 
 * @memberof DatabaseService
 */
  getTourData(tourId): Promise<any> {
    let ti: string = this.logt + "getTourData";
    let parameters = [tourId];
    let query: string =
      "SELECT * FROM TourData WHERE tourid = (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(query, parameters)
          .then((data) => {
            if (data.rows.length > 0) {
              resolve(data.rows.item(0));
            } else {
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  //******************************************************/
  //******************** TASKLIST ************************/
  //******************************************************/

  /**
  * Leer registro en la tabla Tasklist
  *
  * @param {number} id
  * @returns {Promise<any>}
  * @memberof DatabaseService
  */
  get_task(id: string): Promise<any> {
    let ti: string = this.logt + "get_task";
    let parameters = [id];
    let query: string =
      "SELECT * FROM Tasklist WHERE taskid = (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          if (data.rows.length > 0) {
            return data.rows.item(0);
          } else {
            return null;
          }
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }

  /**
   * Añadir registro en la tabla de tareas de publicación 
   *
   * @param {*} taskid
   * @param {*} plt_taskid
   * @param {*} tasktype
   * @param {*} tourid
   * @param {*} panoId
   * @param {*} name
   * @param {*} pano
   * @param {*} thumb
   * @param {*} status
   * @returns {Promise<any>}
   * @memberof DatabaseService
   */
  addTask(taskid, plt_taskid, tasktype, tourid, panoId, name, pano, thumb, status): Promise<any> {
    let ti: string = this.logt + "addTask";

    var parameters = [taskid, plt_taskid, tasktype, tourid, panoId, name, pano, thumb, status, 0];

    let query: string =
      `INSERT INTO Tasklist (taskid, plt_taskid, tasktype, tourid, panoId, name, pano, thumb, status, progress) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
 * Obtener todas las tareas de publicación
 * 
 * @returns {Promise<any>} 
 * @memberof DatabaseService
 */
  getAllTasks(all: boolean = false): Promise<any> {
    let ti: string = this.logt + "getAllTasks";
    let query: string;
    if (!all) {
      query = "SELECT * FROM Tasklist WHERE status = " + AppConstants.ST_PENDING;
    }
    else {
      query = "SELECT * FROM Tasklist";
    }
    this.logger.trace(ti, "SQL: ", query);

    return new Promise((resolve, reject) => {
      this.isReady().then(() => {
        this.database.executeSql(query, [])
          .then((data) => {
            if (data.rows.length > 0) {
              if (AppConstants.DEBUG_MODE) {
                // Listar los registros leidos
                for (let i = 0; i < data.rows.length; i++) {
                  this.logger.debug(ti, data.rows.item(i));
                }
              }
              resolve(data.rows);
            } else {
              resolve(null);
            }
          },
            (err) => {
              this.logger.error(ti, "Error: ", err);
              reject(err);
            }
          );
      });
    });
  }

  /**
 * Actualizar el archivo Json de la tarea
 * 
 * @param {any} tourid 
 * @param {any} taskid 
 * @returns {Promise<any>} 
 * @memberof DatabaseService
 */
  updateTaskJson(taskid, jsonfile): Promise<any> {
    let ti: string = this.logt + "updateTaskJson";
    var parameters = [jsonfile, taskid];
    //var parameters = ['...', taskid];
    let query: string = "UPDATE Tasklist SET pano = (?) WHERE taskid = (?) AND tasktype = " + AppConstants.TSK_INIT_PUB.toString();
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Tarea actualizada");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
 * Actualizar identidad de tarea de publicación
 * 
 * @param {any} tourid 
 * @param {any} taskid 
 * @returns {Promise<any>} 
 * @memberof DatabaseService
 */
  updatePublishTask(tourid, internalTaskId, taskid): Promise<any> {
    let ti: string = this.logt + "updatePublishTask";
    var parameters = [taskid, tourid, internalTaskId];
    let query: string = "UPDATE Tasklist SET plt_taskid = (?) WHERE tourId = (?) AND taskid = (?)";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Registro actualizado");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }


  /**
 * Actualizar estado de tarea de publicación
 * 
  * @param {*} panoid
  * @param {*} taskid
  * @param {*} status
  * @returns {Promise<any>}
  * @memberof DatabaseService
  */
  updateTaskStatus(panoid, taskid, status): Promise<any> {
    let ti: string = this.logt + "updateTaskStatus";
    var parameters = [status, panoid, taskid];
    let query: string = "UPDATE Tasklist SET status = (?) WHERE panoid = (?) AND taskid = (?)";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Registro actualizado");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
 * Actualizar progreso de tarea de publicación
 * 
  * @param {*} panoid
  * @param {*} taskid
  * @param {*} status
  * @returns {Promise<any>}
  * @memberof DatabaseService
  */
  updateTaskProgress(panoid, taskid, prog): Promise<any> {
    let ti: string = this.logt + "updateTaskProgress";
    var parameters = [prog, panoid, taskid];
    let query: string = "UPDATE Tasklist SET progress = (?) WHERE panoid = (?) AND taskid = (?)";
    this.logger.trace(ti, "SQL: ", query);

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters)
        .then((data) => {
          this.logger.debug(ti, "Registro actualizado");
          return data;
        },
          (err) => {
            this.logger.error(ti, "Error: ", err);
            return err;
          }
        );
    });
  }

  /**
   * Eliminar tarea de publicación
   *
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof DatabaseService
   */
  remove_task(id: string): Promise<any> {
    let ti: string = this.logt + "remove_task";
    let query: string = "DELETE FROM Tasklist WHERE taskid = (?)";
    let parameters = [id];
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          this.logger.debug(ti, "Borrados todos los registros de taskid = " + id);
          return data;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }

}
