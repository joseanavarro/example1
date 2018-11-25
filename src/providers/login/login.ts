import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Platform } from "ionic-angular";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Logins } from "../../models/logins";
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
export class Login {
  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);
  logt: string;
  logger: Logger;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    public logg: Logger
  ) {
    this.logt = "Login | ";
    let ti: string = this.logt + "constructor";
    this.logger = logg;
    this.logger.info(ti, "Servicio Login creado");
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

          this.createTables().then(() => {
            this.dbReady.next(true);
          });
        });
    });
  }

  /**
   * createTables()
   * Crear las tablas de la App
   *
   * @private
   * @returns {Promise<any>}
   * @valuesof DatabaseService
   */
  private createTables(): Promise<any> {
    let ti: string = this.logt + "createTables";
    this.logger.debug(ti, "Entrar ", "");

    let query = `CREATE TABLE IF NOT EXISTS Login (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  userid TEXT,
                  token TEXT,
                  name TEXT,
                  photo TEXT,
                  email TEXT,
                  fbtoken TEXT,
                  fbid TEXT
                );`;
    return this.database
      .executeSql(query, [])
      .then(() => this.logger.trace(ti, "Tabla creada correctamente: ", query))
      .catch(err => this.logger.error(ti, "Error creando tabla: ", err));
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
  // Métodos del servicio Login
  //-------------------------------------------------------------------------------------
  /**
   * Contar los registros de la tabla
   *
   * @returns
   * @valuesof Login
   */
  countAll(): Promise<any> {
    let ti: string = this.logt + "countAll";
    return this.isReady().then(() => {
      return this.database.executeSql("SELECT * FROM Login", []).then(
        data => {
          this.logger.debug(ti, "Contados registros ", "");
          return data.rows.length;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }
  /**
   * Obtener todos los registros de la tabla
   *
   * @returns
   * @valuesof Login
   */
  getAll(): Promise<any> {
    let ti: string = this.logt + "getAll";
    return this.isReady().then(() => {
      return this.database.executeSql("SELECT * FROM Login", []).then(
        data => {
          let logins = [];
          for (let i = 0; i < data.rows.length; i++) {
            logins.push(data.rows.item(i));
          }
          return logins;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }
  /**
   * Leer registro en la tabla Login a partir de la identidad de registro
   *
   * @param {number} id
   * @returns
   * @memberof Login
   */
  get(id: number): Promise<any> {
    let ti: string = this.logt + "add";
    let parameters = [id];
    let query: string =
      "SELECT id, userid, token, name, photo, email, fbid, fbtoken FROM Login WHERE id = (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          if (data.rows.length) {
            return data.rows.item(0);
          }
          return null;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }

  /**
   * Leer un registro en la tabla Login
   *
   * @returns
   * @memberof Login
   */
  getOne(): Promise<any> {
    let ti: string = this.logt + "add";
    let parameters = [];
    let query: string = "SELECT * FROM Login ORDER BY id DESC LIMIT 1";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          if (data.rows.length) {
            return data.rows.item(0);
          }
          return null;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }

  /**
   * Añadir registro en la tabla Login
   *
   * @param {Logins} values
   * @returns
   * @memberof Login
   */
  add(values: Logins): Promise<any> {
    let ti: string = this.logt + "add";
    let parameters = [
      values.userid,
      values.token,
      values.name,
      values.photo,
      values.email,
      values.fbid,
      values.fbtoken
    ];
    let query: string =
      "INSERT INTO Login (userid, token, name, photo, email, fbid, fbtoken) VALUES (?,?,?,?,?,?,?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          return data;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }
  /**
   * Modificar registro en la tabla Login
   *
   * @param {number} id
   * @param {Logins} values
   * @returns
   * @memberof Login
   */
  update(id: number, values: Logins): Promise<any> {
    let ti: string = this.logt + "add";
    let parameters = [
      values.userid,
      values.token,
      values.name,
      values.photo,
      values.email,
      values.fbid,
      values.fbtoken,
      id
    ];
    let query: string =
      "UPDATE Login SET userid = (?), token = (?), name = (?), photo = (?), email = (?), fbid = (?), fbtoken = (?) WHERE id = (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
          return data;
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          return err;
        }
      );
    });
  }
  /**
   * Borrar registro en la tabla Login
   *
   * @param {number} id
   * @returns
   * @memberof Login
   */
  remove(id: number): Promise<any> {
    let ti: string = this.logt + "add";
    let parameters = [id];
    let query: string = "DELETE FROM Login WHERE id = (?)";
    this.logger.trace(ti, "SQL: ", query);
    this.logger.trace(ti, "Values: ", parameters.toString());

    return this.isReady().then(() => {
      return this.database.executeSql(query, parameters).then(
        data => {
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
