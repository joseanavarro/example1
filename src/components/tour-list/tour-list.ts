import { Component, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Content, LoadingController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
//import { AppConstants } from "../../providers/app-constants/app-constants";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@Component({
  selector: "tour-list",
  templateUrl: "tour-list.html",
  viewProviders: [Content]
})
export class TourListComponent {
  // Parámetro de entrada al componente
  @Input() listType: number; // Tipo de listado

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
  items: Observable<any>;
  notLoaded = 1;

  constructor(
    private logger: Logger,
    public restApi: RestApiProvider,
    //private cache: CacheService,
    public loading: LoadingController,
    public translate: TranslateService
  ) {
    this.logt = "TourListComponent | ";
    this.ti = this.logt + "constructor";
    this.logger.debug(this.ti, "Componente creado");
    this.translate.get("reloading_data").subscribe(value => {
      this.loadingText = value;
    });
    this.notLoaded = 1;
  }

  ngOnInit() {
    //----------------------------------
    // Cargar tours al crear la página
    //----------------------------------
    this.getTours();
  }

  /**
   * Obtener el listado de tours
   *
   * @memberof BestPage
   */
  getTours(refresher = null) {
    this.restApi.getTours(this.page, this.listType).subscribe(res => {
      this.data = res;
      this.tours = res.Elems;
      this.perPage = res.pageSize;
      this.totalData = res.totalItems;
      this.totalPage = res.totalPages;
      if (refresher !== null) {
        refresher.complete();
      }
      this.notLoaded = 0;
    }, error => (this.errorMessage = <any>error));
  }

  /**
   * Ejecutar al llegar al final de la página, cargar más datos
   *
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
          //this.data = res;
          this.perPage = res.pageSize;
          this.totalData = res.totalItems;
          this.totalPage = res.totalPages;
          for (let i = 0; i < res.Elems.length; i++) {
            this.tours.push(res.Elems[i]);
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
