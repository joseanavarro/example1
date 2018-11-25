import { Component } from "@angular/core";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SplashScreen } from "@ionic-native/splash-screen";
import { TranslateService } from "@ngx-translate/core";
import { NavController } from "ionic-angular";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { LoginService } from "../../providers/login-service/login-service";
import { HomePage } from "../home/home";

/**
 * Página de bienvenida
 * 
 * @export
 * @class WelcomePage
 */
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html",
  providers: [LoginService]
})
export class WelcomePage {
  introTitle: string;
  introText: string;
  logt: string;

  /**
   * Creates an instance of WelcomePage.
   * @param {NavController} navCtrl 
   * @param {TranslateService} translate 
   * @param {LoginService} loginServ 
   * @param {Logger} logger 
   * @param {SplashScreen} splashScreen 
   * @param {Globals} globals 
   * @memberof WelcomePage
   */
  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public loginServ: LoginService,
    public logger: Logger,
    private splashScreen: SplashScreen,
    private globals: Globals,
    public db: DatabaseService,
    public ga: GoogleAnalytics
  ) {
    this.logt = "WelcomePage | ";
    let ti = this.logt + "constructor";
    this.logger.info(ti, "Página Welcome creada");
  }

  /**
   * Vista Ionic cargada
   * 
   * @memberof WelcomePage
   */
  ionViewDidLoad() {
    let ti = this.logt + "ionViewDidLoad";

    // Ocualtar pantalla de splash dando tiempo a que se cargue todo
    setTimeout(() => {
      // Borrar todos los registros de tours visualizados
      this.db.remove_tracks().then(() => {
        this.splashScreen.hide();
      });
    }, 1000);

    // ----------------------------------------------------------------- 
    // Comprobar si existe usuario logueado para hacer entrada directa 
    // a la página de menú
    // -----------------------------------------------------------------
    this
      .loginServ.trySilentLogin()
      .then((data) => {
        this.logger.debug(ti, "Hacer auto-login");
        // Tomar el token para su uso en las peticiones al API
        this.globals.token = data.token;
        this.ga.trackEvent(AppConstants.SC_LOGIN, 'AutoLogin');
        this.anonLogin();
      }, err => {
        // No hacer nada
        this.ga.trackEvent(AppConstants.SC_LOGIN, 'AutoLogin not possible');
        this.logger.debug(ti, "No se puede hacer auto-login");
      });
    this.ga.trackView('WelcomePage');

  }

  /**
   * login()
   * Lanzar la página de login
   *
   * @memberof WelcomePage
   */
  login() {
    this.ga.trackEvent(AppConstants.SC_LOGIN, 'Login Form');
    this.navCtrl.push("LoginPage");
  }

  /**
   * anonLogin()
   * Ejecutgar login anónimo
   *
   * @memberof WelcomePage
   */
  anonLogin() {
    this.ga.trackEvent(AppConstants.SC_LOGIN, 'Anon Login');
    this.navCtrl.push(HomePage);
  }

  /**
   * register()
   * Lanzar página de registro
   *
   * @memberof WelcomePage
   */
  register() {
    this.ga.trackEvent(AppConstants.SC_LOGIN, 'Register');
    this.navCtrl.push("SignupPage");
  }
}
