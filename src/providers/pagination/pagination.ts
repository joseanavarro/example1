import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TourPages } from "../../models/tourPages";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@Injectable()
export class PaginationProvider {
  logt: string;
  ti: string;
  errorMessage: string;

  constructor(
    private logger: Logger,
    public restApi: RestApiProvider,
    public translate: TranslateService
  ) {
    this.logt = "PaginationProvider | ";
    this.ti = this.logt + "constructor";
    this.logger.debug(this.ti, "Provider creado");
  }

  /**
   * Ejecutar al llegar al final de la página, cargar más datos
   *
   * @param {any} infiniteScroll
   * @memberof BestPage
   */
  doInfinite(infiniteScroll, tours: TourPages, listType: number): Promise<any> {
    tours.page = tours.page + 1;
    this.ti = this.logt + "doInfinite";
    this.logger.debug(this.ti, "Nueva página: ", tours.page.toString());

    return new Promise(resolve => {
      setTimeout(() => {
        this.restApi.getTours(tours.page, listType).subscribe(res => {
          tours = res;
          this.logger.debug(this.ti, "la operación asíncrona ha finalizado");
          resolve();
        }, error => (this.errorMessage = <any>error));
      }, 500);
    });
  }

  /**
   * Obtener el listado de tours
   *
   * @memberof BestPage
   */
  getTours(refresher = null, tours: TourPages, listType: number) {
    this.restApi.getTours(tours.page, listType).subscribe(res => {
      tours = res;

      if (refresher !== null) {
        refresher.complete();
      }
    }, error => (this.errorMessage = <any>error));
  }
}
