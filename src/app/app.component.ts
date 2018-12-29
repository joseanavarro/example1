import { Component, ViewChild } from "@angular/core";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { StatusBar } from "@ionic-native/status-bar";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { FabContainer, Nav, Platform } from "ionic-angular";
import { CacheService } from "ionic-cache";
import { Pages } from "../models/Pages";
// Páginas de carga inmediata para mostrar en el menú
import { WelcomePage } from "../pages/welcome/welcome";
import { AppConstants } from "../providers/app-constants/app-constants";
import { CameraProvider } from '../providers/camera/camera';
import { EstadoProvider } from "../providers/estado/estado";
import { Globals } from "../providers/globals/globals";
// --- Páginas provisionales ---
// Modúlos propios
import { Logger } from "../providers/logger/logger";
import { MenuProvider } from "../providers/menu/menu";
import { PlatformProvider } from '../providers/platform/platform';
import { UtilProvider } from "../providers/util/util";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // Indicar página de inicio
  rootPage: any = WelcomePage;

  logged: boolean;
  pageHome: string;
  pageConfig: string;
  pageLatest: string;
  pageBest: string;
  pagePublish: string;
  pageRoutes: string;
  pageSearch: string;
  pageNear: string;
  pageAbout: string;
  pageLogout: string;
  pageMyPhotos: string;
  pageCamera: string;
  name: string;
  photo: string;
  authError: string;
  authErrorDesc: string;
  closeButton: string;
  logt: string;
  ti: string;
  cameraConnected: boolean;
  viewCameraConnectedButton: boolean;
  disconnect_title: string;
  disconnect_ios_text: string;
  disconnect_text: string;
  isIOS: boolean;
  upload_error: string;
  close: string;

  // --- Variables provisionales ---
  pageList: string;
  pagePosition: string;
  pageLocation: string;

  pages: Array<Pages>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public translate: TranslateService,
    public logger: Logger,
    public globals: Globals,
    //private splashScreen: SplashScreen,
    private menu: MenuProvider,
    public cache: CacheService,
    public ga: GoogleAnalytics,
    public util: UtilProvider,
    public camService: CameraProvider,
    public plt: PlatformProvider,
    public st: EstadoProvider
  ) {
    this.logt = "WelcomePage | ";
    this.initializeApp(translate, menu);

    // Validez del cache 48h
    cache.setDefaultTTL(60 * 60 * 48);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);

    this.initializeStats();

    // Inicializar estado
    st.init();
  }

  /**
   * initializeApp()
   * - Cargar idiomas
   * - Crear menú de la aplicación
   *
   * @param {TranslateService} translate
   * @memberof MyApp
   */
  initializeApp(translate: TranslateService, menu: MenuProvider) {
    this.ti = this.logt + "initializeApp";

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // this.statusBar.styleBlackOpaque();
      // this.statusBar.overlaysWebView(false); // Para iOS
      // this.statusBar.backgroundColorByHexString("#3a6658");
      this.statusBar.styleDefault();

      // Cargar variables de configuración
      this.loadConfig();

      this.isIOS = this.platform.is('ios');
      this.logged = this.globals.isLogged;
      // Configurar idiomas
      translate.addLangs(["en", "es"]);
      if (this.globals.forcedLang !== "") {
        translate.setDefaultLang(this.globals.forcedLang);
        translate.use(this.globals.forcedLang);
        this.globals.lang = this.globals.forcedLang;
      } else {
        translate.setDefaultLang("en");
        let browserLang = translate.getBrowserLang();
        let usedLang = browserLang.match(/en|es/) ? browserLang : "en";
        translate.use(usedLang);
        this.globals.lang = usedLang;
      }

      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.logger.debug(
          "initializeApp",
          "Idioma cargado -- " + this.pageHome
        );
        this.pages = menu.getMenu(translate);
        this.translate.get("user_error").subscribe(value => {
          this.authError = value;
        });
        this.translate.get("must_login_first").subscribe(value => this.authErrorDesc = value);
        this.translate.get("close_button").subscribe(value => this.closeButton = value);
        this.translate.get("disconnect_camera").subscribe(value => this.disconnect_title = value);
        this.translate.get("disconnect_ios_desc").subscribe(value => this.disconnect_ios_text = value);
        this.translate.get("disconnect_desc").subscribe(value => this.disconnect_text = value);
        this.translate.get("upload_error").subscribe(value => this.upload_error = value);
        this.translate.get("close_button").subscribe(value => this.close = value);

        this.logger.debug("Inicio App", AppConstants.APP_ID);
      });
    });

    // Lanzar de forma diferida la tarea de comprobación de la cámara
    setTimeout(() => {
      this.checkCamera();
      this.publishTours();
    }, 10000);
  }

  /**
   * Cargar variables de configuración por defecto
   * 
   * @memberof MyApp
   */
  loadConfig() {
    // Variables globales temporales, se inicializan al abrir la App
    this.globals.cameraConnected = false;
    this.globals.takingPhoto = false;
    this.globals.cameraConnecting = false;
    this.cameraConnected = false;
    this.viewCameraConnectedButton = false;
    this.globals.stopAllTasks = false;
    this.globals.uploadingPhotos = false;

    // Variables de configuración que hay que leer de la base de datos local
    this.globals.cameraWifi = "";
    this.globals.cfgGetLocation = true;
    this.globals.cfgSaveToExternal = true;
    this.globals.cfgDelCameraFoto = true;
    this.globals.filter = "hdr";
    this.globals.delTourAfterPub = false;
    //this.globals.forcedLang = "es";
    this.globals.forcedLang = "";
    this.globals.wifiCon = false;
  }

  /**
   * Inicializar estadísticas
   * 
   * @memberof MyApp
   */
  initializeStats() {
    this.ga.startTrackerWithId(AppConstants.GOOGLE_ANALYTICS_TRACKING_ID)
      .then(() => {
        this.logger.debug('initializeStats', 'Google analytics is ready now');
        this.ga.setAppVersion(AppConstants.APP_VERS);
        this.ga.trackView(AppConstants.APP_ID + ' App');
      })
      .catch(e => this.logger.error('initializeStats', 'Error starting GoogleAnalytics', e));
  }

  /**
   * tarea en segundo plano para comprobar conexión de la cámara
   * 
   * @memberof MyApp
   */
  checkCamera() {
    this.ti = this.logt + "checkCamera";

    // Lanzar tarea en segundo plano para comprobar conexión con la cámara
    setInterval(() => {
      // Comprobar estado de conexión
      // this.logger.debug(this.ti, 'this.globals.cameraConnected: ', this.globals.cameraConnected.toString());
      // this.logger.debug(this.ti, 'this.globals.takingPhoto: ', this.globals.takingPhoto.toString());
      // this.logger.debug(this.ti, 'this.globals.cameraConnecting: ', this.globals.cameraConnecting.toString());

      if (this.st.get() === AppConstants.ST_CAMERA_CONNECTED) {

        this.logger.debug("Inicio App", "Comprobar estado de conexión con la Cámara");

        this.camService.checkCamera()
          .then(() => {
            this.viewCameraConnectedButton = true;
            this.logger.debug(this.ti, 'Conexión camara OK');
          },
            (err) => {
              this.logger.debug(this.ti, 'Conexión camara Error');
              this.st.set(AppConstants.ST_CAMERA_DISCONNECTING);
              this.st.set(AppConstants.ST_IDLE);
              this.viewCameraConnectedButton = false;
            });
      }
    }, 1000 * 5); // x segundos
  }

  /**
  * tarea en segundo plano para publicar tours
  * 
  * @memberof MyApp
  */
  publishTours() {
    this.ti = this.logt + "publishTours";

    // Lanzar tarea en segundo plano para comprobar conexión con la cámara
    setInterval(() => {

      if (this.st.get() === AppConstants.ST_PUBLISHING) {

        this.logger.debug("Inicio App", "Publicación de tours");

        this.plt.uploadProcess()
          .then(() => {
            this.logger.debug(this.ti, 'Finalizada iteración de subida de fotos');
          },
            (err) => {
              this.st.set(AppConstants.ST_IDLE);
              this.logger.error(this.ti, 'Rechazada tarea de subida de fotos: ', err);
              this.util.presentAlert(this.upload_error, err, this.close);
            });
      }
    }, 1000 * 5); // x segundos

  }

  /**
   * openPage()
   * Abrir la página seleccionada en el menú
   *
   * @param {any} page
   * @memberof MyApp
   */
  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    if (page.auth) {
      // La página no requiere usurio logueado
      this.nav.push(page.component);
    }
    else {
      if (this.globals.isLogged) {
        this.nav.push(page.component);
      }
      else {
        // Usuario no logueado, mostrar mensaje de error
        this.util.presentAlert(this.authError, this.authErrorDesc, this.closeButton);
      }
    }
  }

  /**
   * hasImage()
   * Comprobar si hay imagen de perfil de usuario
   *
   * @returns
   * @memberof MyApp
   */
  hasImage() {
    if (this.globals.isLogged) {
      this.name = this.globals.loggedUser.name;
      this.photo = this.globals.loggedUser.photo;
    }
    return this.globals.isLogged;
  }

  /**
   * Abrir página de perfil
   * 
   * @returns 
   * @memberof MyApp
   */
  openProfile() {
    if (this.globals.isLogged) {
      this.nav.setRoot("UserProfilePage", { item: this.globals.loggedUser.userid });
    }
  }

  /**
   * Ir a la página de la cámara
   * 
   * @memberof MyApp
   */
  openCamera(fab: FabContainer) {
    fab.close();
    this.nav.push("CameraPage");
  }

  /**
  * Ir a la página de cerrar la cámara
  * 
  * @memberof MyApp
  */
  closeCamera(fab: FabContainer) {
    fab.close();
    // Desconectar wifi con la cámara si es Android, si es IOS avisar que el
    // usuario debe desconectar manualmente de la wifi
    this.st.set(AppConstants.ST_IDLE);
    this.nav.setRoot("CameraPage");
    this.util.presentAlert(this.disconnect_title, this.disconnect_ios_text, this.closeButton);

  }


}