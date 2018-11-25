import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateService } from "@ngx-translate/core";
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from "ionic-angular";
import "rxjs/add/operator/map";
import { Logins } from "../../models/logins";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { FacebookLoginService } from "../../providers/facebook-login/facebook-login";
import { Logger } from "../../providers/logger/logger";
import { LoginService } from "../../providers/login-service/login-service";
import { Login } from "../../providers/login/login";
import { UtilProvider } from "../../providers/util/util";
import { HomePage } from "../home/home";

@IonicPage({
  priority: "high"
})
@Component({
  selector: "page-login",
  templateUrl: "login.html",
  providers: [Login, LoginService]
})
export class LoginPage {
  loginForm: FormGroup;
  logt: string;
  user: Logins;
  loadingText: string;
  inputErrorTitle: string;
  inputErrorText: string;
  closeButton: string;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public loading: LoadingController,
    public translate: TranslateService,
    public logger: Logger,
    public login: Login,
    private alertCtrl: AlertController,
    public loginServ: LoginService,
    //private globals: Globals,
    public util: UtilProvider,
    public facebookLoginService: FacebookLoginService,
    public iab: InAppBrowser
  ) {
    this.logt = "Página Login | ";
    let ti = this.logt + "constructor";
    this.logger.info(ti, "Página Login creada");
    this.user = new Logins();
    //-----------------------------------------------------
    // Definir formulario con validaciones para cada campo
    //-----------------------------------------------------
    this.loginForm = formBuilder.group({
      emailInput: ["", [Validators.required, Validators.email]],
      passwordInput: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    let ti = this.logt + "ionViewDidLoad";
    this.logger.debug(ti, "ionViewDidLoad ejecutado");
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
  }

  /**
   * Realizar el login con usuario de la plataforma
   *
   * @memberof LoginPage
   */
  doLogin() {
    let ti = this.logt + "doLogin()";
    this.logger.debug(ti, "Botón de login pulsado");
    //-------------------------------------------------------
    // Comprobar la validez del formulario antes de enviarlo
    //-------------------------------------------------------
    this.formValid(this.loginForm)
      .then(() => {
        this.logger.debug(ti, "Formulario válido");
        //-----------------------------
        // Mostrar indicador de espera
        //-----------------------------
        let loading = this.loading.create({
          content: this.loadingText
        });
        loading.present();
        this.loginServ
          .doLogin(
            AppConstants.W2V_LOGIN,
            this.loginForm.value.emailInput,
            this.loginForm.value.passwordInput
          )
          .then(
            data => {
              this.logger.debug(ti, "Usuario logueado", "");
              this.navCtrl.push(HomePage);
              loading.dismiss();
            },
            err => {
              this.logger.debug(ti, "Error: ", err);
              loading.dismiss();
            }
          );
      })
      .catch(() => {
        //--------------------------------------------------------
        // Los datos introducidos en el formulario no son válidos
        //--------------------------------------------------------
        this.logger.debug(ti, "Formulario NO válido");
        this.util.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
      });
  }

  /**
   * Realizar login con usuario de Facebook
   *
   * @memberof LoginPage
   */
  doFacebookLogin() {
    let ti = this.logt + "doFacebookLogin()";
    this.logger.debug(ti, "Botón de login con Facebook pulsado");
    //-----------------------------
    // Mostrar indicador de espera
    //-----------------------------
    let loading = this.loading.create({
      content: this.loadingText
    });
    loading.present();

    this.facebookLoginService.doFacebookLogin().then(
      () => {
        this.logger.debug(ti, "Usuario logueado con facebook", "");
        loading.dismiss();
        this.navCtrl.push(HomePage);
      },
      err => {
        this.logger.debug(ti, "Error de logueado con facebook", "");
        loading.dismiss();
      }
    );
  }

  /**
   * Realizar login con usuario de Google
   *
   * @memberof LoginPage
   */
  doGoogleLogin() {
    let ti = this.logt + "doGoogleLogin()";
    this.logger.debug(ti, "Botón de login con Google pulsado");
    // Ejemplo de lectura de todos los registros
    this.logger.debug(ti, "Vamos a leer todos los registros");
    this.login.getAll().then(
      data => {
        this.logger.trace(ti, "Usuarios leidos: ", data);
        // Borramos el registro indicado en el campo emailInput
        this.login.remove(parseInt(this.loginForm.value.emailInput)).then(
          data => {
            this.logger.trace(ti, "Usuario borrado: ", data);
          },
          err => {
            this.logger.error(ti, "Error: ", err);
          }
        );
      },
      err => {
        this.logger.error(ti, "Error: ", err);
      }
    );
  }

  /**
   * Realizar login con usuario de Twitter
   *
   * @memberof LoginPage
   */
  doTwitterLogin() {
    let ti = this.logt + "doTwitterLogin()";
    this.logger.debug(ti, "Botón de login con Twitter pulsado");
    // Ejemplo de lectura de todos los registros
    this.logger.debug(ti, "Vamos a leer todos los registros");
    this.login.getAll().then(
      data => {
        this.logger.trace(ti, "Usuarios leidos: ", data);

        let user: Logins = data[0];

        user.email = "newmail@gmail.com";

        // Actualizamos el primer registro leído
        this.login.update(data[0].id, user).then(
          data => {
            this.logger.trace(ti, "Usuario actualizado: ", data[0]);
          },
          err => {
            this.logger.error(ti, "Error: ", err);
          }
        );
      },
      err => {
        this.logger.error(ti, "Error: ", err);
      }
    );
  }

  /**
   * Volver atrás
   *
   * @memberof LoginPage
   */
  goBack() {
    this.navCtrl.pop();
  }

  /**
   * Abrir enlace externo
   *
   * @param {string} url
   * @memberof LoginPage
   */
  openExtern(url: string) {
    let ref = this.iab.create(url, '_blank', 'location=no,footer=yes,footercolor=#3a6658');
  }

  /**
   * Abrir página de recordar contraseña
   *
   * @memberof LoginPage
   */
  goToForgotPassword() {
    this.openExtern(AppConstants.REMEM_PASS_URL);
  }

  /**
   * Abrir página de registro
   *
   * @memberof LoginPage
   */
  goToSignup() {
    this.navCtrl.push("SignupPage");
  }

  /**
   * Comprueba si un formulario es válido
   *
   * @param {FormGroup} aForm
   * @memberof LoginPage
   */
  formValid(aForm: FormGroup): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (aForm.valid) {
        resolve();
      } else {
        reject();
      }
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
