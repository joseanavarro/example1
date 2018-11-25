import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Pages } from "../../models/Pages";
import { ConfigPage } from "../../pages/config/config";
// Páginas de carga inmediata para mostrar en el menú
import { HomePage } from "../../pages/home/home";
import { Logger } from "../../providers/logger/logger";


/**
 * Genera la estructura en la que se construye el menú de la aplicación
 * para que pueda ser utilizada en varias zonas de la App
 *
 * @export
 * @class MenuProvider
 */
@Injectable()
export class MenuProvider {
  pages: Array<Pages>;

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
  // --- Variables provisionales ---
  pageList: string;
  pagePosition: string;
  pageLocation: string;
  pubTasks: string;
  logt: string;

  constructor(public logger: Logger) {
    this.logt = "MenuProvider | ";
  }

  /**
   * getMenu
   * Devolver el menú de la aplicación
   *
   * @returns
   * @memberof MenuProvider
   */
  getMenu(translate: TranslateService) {
    let ti: string = this.logt + "getMenu";
    if (typeof this.pages !== "undefined" && this.pages.length > 0) {
      this.logger.debug(ti, "No es necesario recargar el menú");
    } else {
      // Generación de los elementos del menú de la aplicación
      this.pageHome = translate.instant("home");
      this.pageConfig = translate.instant("config");
      this.pageBest = translate.instant("best");
      this.pageLatest = translate.instant("latest");
      this.pagePublish = translate.instant("sel_photo");
      this.pageRoutes = translate.instant("routes");
      this.pageSearch = translate.instant("search");
      this.pageNear = translate.instant("near");
      this.pageAbout = translate.instant("about");
      this.pageLogout = translate.instant("logout");
      this.pageMyPhotos = translate.instant("my_photos");
      this.pageCamera = translate.instant("take_photos");
      this.pubTasks = translate.instant("publish_tasks");


      this.pageList = translate.instant("list");
      //this.pagePosition = translate.instant("position");
      //this.pageLocation = translate.instant("position");
      // Definir las páginas del menú de la aplicación
      // Iconos:  http://ionicframework.com/docs/ionicons/
      this.pages = [
        {
          title: this.pageHome,
          icon: "home",
          auth: true,
          component: HomePage
        },
        // {
        //   title: this.pageBest,
        //   icon: "star",
        //   auth: true,
        //   component: "BestPage"
        // },
        // {
        //   title: this.pageLatest,
        //   icon: "calendar",
        //   auth: true,
        //   component: "NewToursPage"
        // },
        // {
        //   title: this.pageRoutes,
        //   icon: "compass",
        //   auth: true,
        //   component: "RoutesPage"
        // },
        // {
        //   title: this.pageSearch,
        //   icon: "search",
        //   auth: true,
        //   component: "SearchPage"
        // },
        // {
        //   title: this.pageNear,
        //   icon: "locate",
        //   auth: true,
        //   component: "NearPage"
        // },
        {
          title: this.pageMyPhotos,
          icon: "images",
          auth: false,
          component: "MyPhotosPage"
        },
        {
          title: this.pageCamera,
          icon: "camera",
          auth: false,
          component: "CameraPage"
        },
        {
          title: this.pagePublish,
          icon: "albums",
          auth: false,
          component: "PublishPage"
        },
        {
          title: this.pubTasks,
          icon: "arrow-up",
          auth: false,
          component: "PubTasksPage"
        },
        {
          title: this.pageConfig,
          icon: "settings",
          auth: false,
          component: ConfigPage
        },
        {
          title: this.pageAbout,
          icon: "information-circle",
          auth: true,
          component: "AboutPage"
        },
        {
          title: this.pageLogout,
          icon: "log-out",
          auth: true,
          component: "LogoutPage"
        }
      ];
      this.logger.debug(ti, "Recargar el menú");
    }
    return this.pages;
  }
}
