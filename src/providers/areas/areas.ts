import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AreaOrder } from '../../models/areaOrder';
import { TourArea } from "../../models/tourArea";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@Injectable()
export class AreasProvider {
  txtHidden: string;

  public panoList: AreaOrder[];
  public numPanos: number;
  tour_areas: TourArea[];

  constructor(
    public translate: TranslateService,
    public restApi: RestApiProvider
  ) {
    this.panoList = [];
    this.translate.get("hidden").subscribe(value => this.txtHidden = value);
  }

  /**
   * Guardar item 
   *
   * @param {number} p_porder
   * @param {number} p_area_id
   * @param {string} p_area_name
   * @param {string} p_area_description
   * @param {number} p_pano_id
   * @param {string} p_pano_description
   * @param {string} p_pano_name
   * @param {string} p_pano_thumbnail
   * @memberof AreasProvider
   */
  saveItem(
    p_porder: number,
    p_area_id: number,
    p_area_name: string,
    p_pano_id: string,
  ) {

    this.panoList.push({
      porder: p_porder,
      area_id: p_area_id,
      area_name: p_area_name,
      pano_id: p_pano_id
    });
  }

  /**
   * Obtener longitud de elementos
   *
   * @returns {number}
   * @memberof AreasProvider
   */
  getLength(): number {
    return this.panoList.length;
  }

  /**
   * Devolver el número de áreas
   *
   * @memberof AreasProvider
   */
  getAreasCount(): number {
    let count: number;
    let lista = this.getOrderedList();
    if (lista.length > 0) {
      count = Number(lista[lista.length - 1].area_id) + 1;
    } else {
      count = 0;
    }
    return count;
  }

  /**
   * Devolver el número de panoramas
   * @memberof AreasProvider
   */
  setPanosCount(counter: number) {
    this.numPanos = counter;
  }

  /**
   * Devolver el número de panoramas
   * @memberof AreasProvider
   */
  getPanosCount(): number {
    return this.numPanos;
  }

  /**
   * Devolver el número de panoramas de un área
   *
   * @param {number} areaId
   * @returns {number}
   * @memberof AreasProvider
   */
  getNumPanosArea(areaId: number): number {

    let counter: number = 0;

    for (let i = 0; i < this.panoList.length; i++) {
      if (this.panoList[i].area_id === areaId &&
        this.panoList[i].pano_id != "0" &&
        this.panoList[i].pano_id != "") {

        counter += 1;
      }
    }
    return counter;
  }

  /**
   * Devolver la lista de nombres de áreas. 
   *
   * @memberof AreasProvider
   */
  getAreaList(idTour: string, idPano: string, edit: boolean = false): Promise<any> {

    let selArea: number;
    let lista = this.getOrderedList();

    return this.genSimpleAreaList(idTour)
      .then((result) => {
        // Bucle para saber qué zona es la seleccionada
        for (let i = 0; i < lista.length; i++) {
          if (idPano === lista[i].pano_id) {
            selArea = Number(lista[i].area_id);
          }
        }
        // Bucle para indicar la zona seleccionada
        for (let k = 0; k < result.length; k++) {
          if (selArea === Number(result[k].id)) {
            result[k].sel = true;
          } else {
            result[k].sel = false;
          }
        }
        return result;
      })
  }

  /**
   * Vaciar la lista
   *
   * @memberof AreasProvider
   */
  clear() {
    this.panoList.length = 0;
  }

  /**
   * Establecer el área a la que pertenece un panorama
   *
   * @param {number} pano -- Panorama a actualizar
   * @param {number} area -- Nueva área a la que pertenece el pano
   * @memberof AreasProvider
   */
  setAreaPano(pano: string, area: number) {
    let porder: number = -1;
    //area -= 1;
    for (let i = 0; i < this.panoList.length; i++) {
      if (this.panoList[i].pano_id === pano) {
        // También tenemos que actualizar el valor de 'porder' incrementando el valor
        // del último panorama existente en la zona
        for (let j = 0; j < this.panoList.length; j++) {
          //console.log("this.panoList[j].area_id: " + this.panoList[j].area_id)
          if (this.panoList[j].area_id == area) {
            if (this.panoList[j].porder > porder) {
              porder = this.panoList[j].porder;
            }
          }
        }
        // Actualizamos los valores
        this.panoList[i].area_id = area;
        this.panoList[i].porder = porder + 1;
      }
    }
  }

  /**
   * 
   * Devolver la lista ordenada de acuerdo a la situación actual
   *
   * @memberof AreasProvider
   */
  getOrderedList(): AreaOrder[] {
    return this.panoList.sort(function (a, b) {
      return a.area_id - b.area_id || a.porder - b.porder;
    });
  }

  /**
   * Generar lista de áreas, descargando del servidor
   *
   * @param {*} tourId
   * @memberof AreasProvider
   */
  genSimpleAreaList(tourId: any): Promise<any> {
    let result: any[] = [];

    return new Promise((resolve, reject) => {

      this.restApi.getAreas(tourId).subscribe(res => {
        this.tour_areas = res.Elems;
        // Agregar el área -1 para saber si hay panos ocultos
        let hidden: TourArea = {
          description: "",
          id_area: "-1",
          id_visit: this.tour_areas[0].id_visit,
          name: this.txtHidden,
          thumbnail: this.tour_areas[0].thumbnail,
          panos: []
        }
        this.tour_areas.push(hidden);

        for (let i = 0; i < this.tour_areas.length; i++) {
          result.push({
            id: res.Elems[i].id_area,
            area: res.Elems[i].name,
            sel: false
          });
        }
        resolve(result);
      });

    });
  }

}
