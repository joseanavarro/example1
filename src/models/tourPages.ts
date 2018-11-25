import { TourItem } from "../models/tourItem";
//********************************************************/
// Estructura que define la página en un listado de tours
//********************************************************/
export class TourPages {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  Elems: TourItem[];

  constructor() {
    this.page = 1;
    this.pageSize = 0;
    this.totalItems = 0;
    this.totalPages = 0;
  }
}
