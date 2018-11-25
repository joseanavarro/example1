import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { Logger } from "../../providers/logger/logger";
import { TranslateService } from "@ngx-translate/core";
import { UtilProvider } from "../../providers/util/util";

/**
 * Página que muestra los mejores panoramas
 *
 * @export
 * @class BestPage
 */
@IonicPage()
@Component({
  selector: "page-page-best",
  templateUrl: "page-best.html"
})
export class BestPage {
  listType = AppConstants.PAGE_BEST;
  logt: string;
  ti: string;
  loadingText: string;
  //-------------------------------------------
  data: any;
  tours: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  //-------------------------------------------
  notLoaded = 1;

  /**
   * Creates an instance of BestPage.
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {RestApiProvider} restApi
   * @memberof BestPage
   */
  constructor(
    private logger: Logger,
    public navCtrl: NavController,
    public navParams: NavParams,
    public restApi: RestApiProvider,
    public translate: TranslateService,
    public util: UtilProvider
  ) {
    this.logt = "BestPage | ";
    this.ti = this.logt + "constructor";
    this.logger.debug(this.ti, "Página creada");
    this.notLoaded = 1;
    //----------------------------------
    // Cargar tours al crear la página
    //----------------------------------
    this.getTours();
  }

  /**
   *
   *
   * @memberof BestPage
   */
  ionViewDidLoad() {
    this.translate.get("reloading_data").subscribe(value => {
      this.loadingText = value;
    });
  }

  /**
   * Obtener el listado de tours
   *
   * @memberof BestPage
   */
  getTours(refresher = null) {
    this.restApi.getTours(this.page, this.listType).subscribe(res => {
      this.data = res;
      this.tours = this.data.Elems;
      this.perPage = this.data.pagesize;
      this.totalData = this.data.totalItems;
      this.totalPage = this.data.totalPages;
      if (refresher !== null) {
        refresher.complete();
      }
      this.notLoaded = 0;
    }, error => (this.errorMessage = <any>error));
  }

  /**
   * Ejecutar al llegar al final de la página, cargar más datos
   *
   * @param {any} infiniteScroll
   * @memberof BestPage
   */
  doInfinite(infiniteScroll): Promise<any> {
    this.page = this.page + 1;
    this.ti = this.logt + "doInfinite";
    this.logger.debug(this.ti, "Nueva página: ", this.page.toString());

    return new Promise(resolve => {
      setTimeout(() => {
        this.restApi.getTours(this.page, this.listType).subscribe(res => {
          this.data = res;
          this.perPage = this.data.pagesize;
          this.totalData = this.data.totalItems;
          this.totalPage = this.data.totalPages;
          for (let i = 0; i < this.data.Elems.length; i++) {
            this.util.addToArray(this.tours, this.data.Elems[i])
          }
          this.logger.debug(this.ti, "la operación asíncrona ha finalizado");
          resolve();
        }, error => (this.errorMessage = <any>error));
      }, 500);
    });
  }


  // Pull to refresh and force reload
  forceReload(refresher) {
    this.getTours(refresher);
  }

}
