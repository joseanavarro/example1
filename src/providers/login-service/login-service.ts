import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { Logger } from "../../providers/logger/logger";
import { Logins } from "../../models/logins";
import { TokenResp } from "../../models/tokenResp";
import { Login } from "../../providers/login/login";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { AlertController } from "ionic-angular";
import { Globals } from "../../providers/globals/globals";
import "rxjs/add/operator/map";

@Injectable()
export class LoginService {
  logt: string;
  user: Logins;
  loadingText: string;
  inputErrorTitle: string;
  inputErrorText: string;
  closeButton: string;
  httpErrorTitle: string;
  httpErrorText: string;
  internalErrorTitle: string;
  internalErrorText: string;
  errorText: string;
  userRegisteredTitle: string;
  welcomeText: string;
  userNotConfirmed: string;
  token: TokenResp;

  constructor(
    public http: HttpClient,
    public translate: TranslateService,
    public logger: Logger,
    public login: Login,
    private alertCtrl: AlertController,
    private globals: Globals
  ) {
    this.logt = "LoginService | ";

    this.translate.get("login_wait").subscribe(value => {
      this.loadingText = value;
    });
    this.translate.get("input_error").subscribe(value => {
      this.inputErrorTitle = value;
    });
    this.translate.get("input_error_desc").subscribe(value => {
      this.inputErrorText = value;
    });
    this.translate.get("close_button").subscribe(value => {
      this.closeButton = value;
    });
    this.translate.get("http_error").subscribe(value => {
      this.httpErrorTitle = value;
    });
    this.translate.get("http_error_desc").subscribe(value => {
      this.httpErrorText = value;
    });
    this.translate.get("internal_error").subscribe(value => {
      this.internalErrorTitle = value;
    });
    this.translate.get("internal_error_desc").subscribe(value => {
      this.internalErrorText = value;
    });
    this.translate.get("user_registered").subscribe(value => {
      this.userRegisteredTitle = value;
    });
    this.translate.get("welcome").subscribe(value => {
      this.welcomeText = value;
    });
    this.translate.get("user_not_confirmed").subscribe(value => {
      this.userNotConfirmed = value;
    });
  }

  /**
   * Intenta logear al usuario si sus datos ya están en la tabla Logins
   *
   * @memberof LoginService
   */
  trySilentLogin(): Promise<any> {
    //-------------------------------------------------------------------------------------
    // checks if user is already signed in to the app and sign them in silently if they are.
    //-------------------------------------------------------------------------------------
    let ti = this.logt + "trySilentLogin";
    return new Promise<Logins>((resolve, reject) => {
      //----------------------------------
      // Buscamos si ya existe el usuario
      //----------------------------------
      this.login.getOne().then(
        data => {
          if (data !== null) {
            this.logger.trace(ti, "Obtenido registro: ", data);
            let user: Logins = data;
            if (user.token !== "") {
              this.logger.debug(ti, "Usuario ya logueado", "");
              this.globals.loggedUser = user;
              this.globals.isLogged = true;
              resolve(user);
            } else {
              this.logger.debug(ti, "Usuario No logueado", "");
              reject();
            }
          } else {
            this.logger.trace(ti, "No hay registro: ", "");
            reject();
          }
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          this.presentAlert(this.internalErrorTitle, this.internalErrorText, this.closeButton);
          reject(err);
        }
      );
    });
  }

  /**
   * Realizar el proceso de log in con usuario de la plataforma
   * loginType: Tipo de login
   * @returns
   * @memberof LoginService
   */
  doLogin(
    loginType: number,
    emailParam: string,
    secondParam: string
  ): Promise<any> {
    let loginUrl: string;
    let ti = this.logt + "doLogin";

    switch (loginType) {
      case AppConstants.W2V_LOGIN:
        loginUrl =
          AppConstants.AUTH_API_URL +
          AppConstants.W2V_LOGIN_URL +
          `?u=${emailParam}&p=${secondParam}`;
        break;

      case AppConstants.FACEBOOK_LOGIN:
        loginUrl =
          AppConstants.AUTH_API_URL +
          AppConstants.FACEBOOK_LOGIN_URL +
          `?token=${secondParam}`;
        break;
    }

    return new Promise<Logins>((resolve, reject) => {
      //------------------------------------------
      // Realizar llamada al API de autenticación
      //------------------------------------------
      this.http.get(loginUrl).subscribe(
        data => {
          //--------------------------------------------
          // Comprobar si se recibe el token o un error
          //--------------------------------------------
          if (JSON.stringify(data).includes("token")) {
            //------------------------
            // Credenciales correctas
            //------------------------
            this.logger.debug(ti, "Credenciales correctas");
            this.globals.token = data["token"];
            //---------------------------------
            // Solicitar los datos del usuario
            //---------------------------------
            this.http
              .get(AppConstants.AUTH_API_URL + `profile.aspx?token=${this.globals.token}`)
              .subscribe(
                data => {
                  //-----------------------------------------------------------------
                  // Crear o actualizar registro de usuario, si ya existe un registro
                  // se modifica y si no existe se crea
                  //-----------------------------------------------------------------
                  // Creamos la variable con los datos de usuario
                  //----------------------------------------------
                  let user: Logins = new Logins();
                  user.email = emailParam;
                  user.fbid = "";
                  user.fbtoken = "";
                  user.id = emailParam;
                  user.name = data["name"] + " " + data["surname"];
                  user.photo = data["profile_pic"];
                  user.token = this.globals.token;

                  let userId0: string = data["profile_pic"];
                  let userId: string[] = userId0.split("=");

                  user.userid = userId[1];
                  //--------------------
                  // Buscamos si existe
                  //--------------------
                  this.login.getOne().then(
                    data => {
                      if (data !== null) {
                        this.logger.trace(ti, "Obtenido registro: ", data);
                        //--------------------------------
                        // Actualizamos el registro leído
                        //--------------------------------
                        this.login.update(data.id, user).then(
                          data => {
                            this.logger.trace(ti, "U. ctualizado: ", data[0]);
                            this.globals.loggedUser = user;
                            this.globals.isLogged = true;
                            resolve(user);
                          },
                          err => {
                            this.logger.error(ti, "Error: ", err);
                            this.presentAlert(this.internalErrorTitle, this.internalErrorText, this.closeButton);
                            reject(err);
                          }
                        );
                      } else {
                        this.logger.trace(ti, "No hay registro: ", "");
                        //---------------------------
                        // Creamos un nuevo registro
                        //---------------------------
                        this.login.add(user).then(
                          data => {
                            this.logger.trace(ti, "Usuario creado: ", data[0]);
                            this.globals.loggedUser = user;
                            this.globals.isLogged = true;
                            resolve(user);
                          },
                          err => {
                            this.logger.error(ti, "Error: ", err);
                            this.presentAlert(this.internalErrorTitle, this.internalErrorText, this.closeButton);
                            reject(err);
                          }
                        );
                      }
                    },
                    err => {
                      this.logger.error(ti, "Error: ", err);
                      this.presentAlert(this.internalErrorTitle, this.internalErrorText, this.closeButton);
                      reject(err);
                    }
                  );
                },
                err => {
                  //------------------------------------------
                  // Error al solicitar el perfil del usuario
                  //------------------------------------------
                  this.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
                  this.logger.error(ti, "Error en petición HTTP", JSON.stringify(err));
                  reject(err);
                }
              );
          } else {
            //------------------------------------------------------------
            // Error al hacer login de usuario, los datos son incorrectos
            //------------------------------------------------------------
            this.logger.debug(ti, "Error de login");
            let errorMsg: string = data["error"];
            this.translate.get(errorMsg).subscribe(value => {
              this.errorText = value;
              this.presentAlert(this.inputErrorTitle, this.errorText, this.closeButton);
              reject();
            });
          }
          this.logger.trace(ti, "recibido al hacer login", JSON.stringify(data));
        },
        err => {
          //---------------------------------------------
          // Error de servidor al hacer login de usuario
          //---------------------------------------------
          this.presentAlert(this.httpErrorTitle, this.httpErrorText, this.closeButton);
          this.logger.error(ti, "Error en petición HTTP", JSON.stringify(err));
          reject(err);
        }
      );
    });
  }

  /**
   * Realizar el logout del usuario
   *
   * @returns
   * @memberof LoginService
   */
  doLogout(): Promise<any> {
    let ti = this.logt + "doLogout";
    return new Promise((resolve, reject) => {
      //-----------------------------------------
      // Borramos el usuario almacenado de la BD
      //-----------------------------------------
      let user: Logins = new Logins();
      user.email = "";
      user.fbid = "";
      user.fbtoken = "";
      user.id = "";
      user.name = "";
      user.photo = "";
      user.token = "";
      user.userid = "";

      this.login.getOne().then(
        data => {
          if (data !== null) {
            this.logger.trace(ti, "Obtenido registro: ", data);
            //--------------------------------
            // Actualizamos el registro leído
            //--------------------------------
            this.login.update(data.id, user).then(
              data => {
                this.logger.trace(ti, "U. ctualizado: ", data[0]);
                this.globals.loggedUser = user;
                this.globals.isLogged = false;
                resolve(user);
              },
              err => {
                this.logger.error(ti, "Error: ", err);
                this.presentAlert(this.internalErrorTitle, this.internalErrorText, this.closeButton);
                reject(err);
              }
            );
          } else {
            //-------------------------------------
            // No existe registro, no hacemos nada
            //-------------------------------------
            this.logger.trace(ti, "No hay registro: ", "");
            resolve();
          }
        },
        err => {
          this.logger.error(ti, "Error: ", err);
          this.presentAlert(this.internalErrorTitle, this.internalErrorText, this.closeButton);
          reject(err);
        }
      );
    });
  }

  /**
   * Realizar el proceso de registro en la plataforma
   *
   * @returns
   * @memberof LoginService
   */
  doSignup(
    nameForm: string,
    surnameForm: string,
    emailForm: string,
    passwordForm: string
  ): Promise<any> {
    let ti = this.logt + "doLogin";
    return new Promise<Logins>((resolve, reject) => {
      //------------------------------------------
      // Realizar llamada al API de autenticación
      //------------------------------------------
      this.http
        .get(
          AppConstants.AUTH_API_URL +
          `register.aspx?name=${nameForm}&surname=${surnameForm}
            &email=${emailForm}&pass=${passwordForm}&lng=${this.globals.lang}`
        )
        .subscribe(
          data => {
            if (data["success"]) {
              this.logger.debug(ti, "Usuario registrado");
              this.presentAlert(
                this.userRegisteredTitle,
                this.welcomeText + " " + this.userNotConfirmed,
                this.closeButton
              );
              resolve();
            } else {
              //----------------------------------------------------------------
              // El usuario no se ha podido registrar, mostrar mensaje de error
              //----------------------------------------------------------------
              this.logger.debug(ti, "Usuario NO registrado");
              let errorMsg: string = data["error"];
              this.translate.get(errorMsg).subscribe(value => {
                this.errorText = value;
                this.presentAlert(this.inputErrorTitle, this.errorText, this.closeButton);
                reject();
              });
            }
          },
          err => {
            //------------------------------------------------
            // Error de servidor al hacer registro de usuario
            //------------------------------------------------
            this.presentAlert(this.httpErrorTitle, this.httpErrorText, this.closeButton);
            this.logger.error(ti, "Error en petición HTTP", JSON.stringify(err));
            reject(err);
          }
        );
    });
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
      buttons: [bText]
    });
    alert.present();
  }
}
