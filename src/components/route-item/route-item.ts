import { Component, Input } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { NavController } from "ionic-angular";
import { RouteItem } from "../../models/routeItem";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'route-item',
  templateUrl: 'route-item.html'
})
export class RouteItemComponent {
  // Parámetro de entrada al componente
  @Input() item: RouteItem;

  logt: string;
  ti: string;

  constructor(
    public navCtrl: NavController,
    //private logger: Logger,
    public translate: TranslateService,
    public restApi: RestApiProvider,
    public util: UtilProvider,
    //private app: App,
    public ga: GoogleAnalytics
  ) {
    this.logt = "RouteItemComponent | ";

  }

  /**
   * Acceder a la página de detalles de ruta
   * 
   * @param {RouteItem} item 
   * @memberof RouteItemComponent
   */
  viewRoute(route: RouteItem) {
    this.navCtrl.push("RouteDetailPage", { item: route });
  }

  /**
   * Devolver estilo (se devuelve la foto como fondo de un div)
   * 
   * @param {RouteItem} item 
   * @returns 
   * @memberof RouteItemComponent
   */
  getStyle(item: RouteItem) {
    let myStyles = {
      "background-image": "url('" + item.thumbnail + "')"
    };
    return myStyles;
  }

}
