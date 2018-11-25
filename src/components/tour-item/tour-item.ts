import { Component, Input } from "@angular/core";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { App, NavController } from "ionic-angular";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { GeoProvider } from "../../providers/geo/geo";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: "tour-item",
  templateUrl: "tour-item.html"
})
export class TourItemComponent {
  // Parámetro de entrada al componente
  @Input() item: TourItem;
  @Input() typeOfLink: number;

  logt: string;
  ti: string;
  httpError: string;
  httpErrorDesc: string;
  closeButton: string;
  authError: string;
  authErrorDesc: string;

  constructor(
    public navCtrl: NavController,
    private logger: Logger,
    public translate: TranslateService,
    public restApi: RestApiProvider,
    public util: UtilProvider,
    private app: App,
    public ga: GoogleAnalytics,
    public geo: GeoProvider
  ) {
    this.logt = "TourItemComponent | ";
    this.translate.get("http_error").subscribe(value => this.httpError = value);
    this.translate.get("http_error_desc").subscribe(value => this.httpErrorDesc = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("user_error").subscribe(value => this.authError = value);
    this.translate.get("must_login_first").subscribe(value => this.authErrorDesc = value);
  }

  /**
   * Saltar a la página del fotógrafo
   *
   * @param {number} user
   * @memberof TourItemComponent
   */
  photographerProfile(user: number) {
    this.navCtrl.push("UserProfilePage", { item: user });
  }

  /**
   * Visualizar los detalles de la visita virtual
   *
   * @param {TourItem} visit
   * @memberof TourItemComponent
   */
  viewVisit(visit: TourItem, linkType: number = 0) {
    this.ti = this.logt + "viewVisit";
    this.logger.debug(this.ti, "Detalle visita: ", visit.id.toString());
    //--------------------------------------
    // Abrir la página de detalle de visita
    //--------------------------------------
    if (linkType === 1) {
      // Acceder a página fuera de un Tab
      this.app.getRootNav().push("TourDetailPage", { item: visit });
    } else {
      this.navCtrl.push("TourDetailPage", { item: visit });
    }
  }

  /**
   * Obtener el estilo de imagen de fondo con la miniatura del panorama
   *
   * @param {TourItem} item
   * @returns
   * @memberof TourItemComponent
   */
  getPanoImage(item: TourItem) {
    let myStyles = {
      "background-image": "url('" + item.thumbnail + "')"
    };
    return myStyles;
  }

  /**
   * Obtener el nombre correcto de la ubicación del panorama
   *
   * @param {TourItem} item
   * @returns
   * @memberof TourItemComponent
   */
  getLocationName(item: TourItem) {
    return this.geo.getLocationName(item);
  }

  /**
   * Obtener imagen de perfil
   *
   * @param {TourItem} item
   * @returns
   * @memberof TourItemComponent
   */
  getProfilePic(item: TourItem) {
    return this.util.getProfilePic(item);
  }

  /**
   * Indicar que gusta el tour
   *
   * @memberof TourItemComponent
   */
  like(item: TourItem, value: boolean) {
    this.ti = this.logt + "like";
    this.restApi.like(item, value).subscribe(
      data => {
        // Cambiar el color del icono
        item.liked = !item.liked;
        // Cambiar el número de likes mostrados
        if (value) {
          item.likes += 1;
        } else {
          item.likes -= 1;
        }
        this.ga.trackEvent(AppConstants.SC_TOUR, "like", item.id.toString());
      },
      err => {
        this.logger.error(this.ti, "Error: ", err);
        if (err.status === 403) {
          // Mostrara error de autentificación
          this.util.presentAlert(this.authError, this.authErrorDesc, this.closeButton);
        }
        else {
          // Mostrar mensaje de error de conexión
          this.util.presentAlert(this.httpError, this.httpErrorDesc, this.closeButton);
        }
      }
    );
  }

  /**
  * Mostrar página de edición
  * 
  * @memberof TourItemComponent
  */
  edit(tour: TourItem, linkType: number = 0) {
    this.navCtrl.push("EditTourPage", { item: tour });
  }

}
