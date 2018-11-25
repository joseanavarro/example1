import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NavController } from "ionic-angular";
import { Pages } from "../../models/Pages";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { MenuProvider } from "../../providers/menu/menu";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // Propiedades de la página
  signup: string;
  title1: string;
  logt: string;
  logged: boolean;
  pages: Array<Pages>;
  authError: string;
  authErrorDesc: string;
  closeButton: string;

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private logger: Logger,
    private globals: Globals,
    private menu: MenuProvider,
    public util: UtilProvider
  ) {
    this.logt = "HomePage | ";
    //debugger;
    this.logger.trace(this.logt, "*** Constructor");
  }

  /**
   * ionViewDidLoad: Fired only when a view is stored in memory. 
   * This event is NOT fired on entering a view that is already cached. 
   * It’s a nice place for init related tasks.
   *
   * @memberof HomePage
   */
  ionViewDidLoad() {
    let ti: string = this.logt + "ionViewDidLoad";
    this.translate.get("user_error").subscribe(value => this.authError = value);
    this.translate.get("must_login_first").subscribe(value => this.authErrorDesc = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);

    // Cargar items del menú
    this.pages = this.menu.getMenu(this.translate);
    this.logged = this.globals.isLogged;
    this.logger.debug(ti, "Cargado menú de la App");

    // Si el usuario está logueado, cargar los valores de configuración
    // almacenados
    if (this.logged) {
      this.util.loadConfig()
        .then(() => {
          this.logger.debug(ti, "Configuración de usuario cargada");
        });
    }
  }

  ionViewWillEnter() {
    let ti: string = this.logt + "ionViewWillEnter: ";
    // Traza de prueba
    this.logger.debug(ti, "Se ejecuta cada vez que se carga la página");
  }

  /**
   * openPage()
   * Abrir la página seleccionada en el menú
   *
   * @param {any} page
   * @memberof MyApp
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    if (page.auth) {
      // La página no requiere usurio logueado
      this.navCtrl.push(page.component);
    }
    else {
      if (this.globals.isLogged) {
        this.navCtrl.push(page.component);
      }
      else {
        // Usuario no logueado, mostrar mensaje de error
        this.util.presentAlert(this.authError, this.authErrorDesc, this.closeButton);
      }
    }
  }
}
