import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from '@angular/http';
import { TranslateService } from "@ngx-translate/core";
import { CacheService } from "ionic-cache";
import 'rxjs/add/observable/forkJoin';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { Observable } from "rxjs/Observable";
import { HotSpot } from "../../models/hotSpot";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";

/**
 * Conecta con el API de W2V y obtiene los listados de los
 * tours publicados
 *
 * @export
 * @class RestApiProvider
 */
@Injectable()
export class RestApiProvider {
  private apiUrl1 = AppConstants.W2V_API_URL1;
  private apiUrl = AppConstants.W2V_API_URL2;
  logt: string;
  ti: string;
  tours: Observable<any>;
  toursKey: string;
  txtHidden: string;

  /**
   * Creates an instance of RestApiProvider.
   * @param {Http} http
   * @param {Globals} globals
   * @memberof RestApiProvider
   */
  constructor(
    private logger: Logger,
    public http: Http,
    public globals: Globals,
    private cache: CacheService,
    public translate: TranslateService
  ) {
    this.logt = "RestApiProvider | ";
    this.ti = this.logt + "constructor";
    this.logger.debug(this.ti, "Proveedor creado");
  }

  /**
   *
   *
   * @param {any} page
   * @returns {Observable<string[]>}
   * @memberof RestApiProvider
   */
  getTours(page, listType, search = ''): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getTours";

    switch (listType) {
      case AppConstants.PAGE_BEST:
        listUrl =
          this.apiUrl +
          `visits?search=&pageSize=4&type=1&lng=${this.globals.lang}&portal=${
          AppConstants.PORTAL_ID
          }&page=${page}&token=${this.globals.token}`;
        this.logger.trace(this.ti, "URL: ", listUrl);
        this.toursKey = "best-tours-group";
        break;

      case AppConstants.PAGE_LAST:
        listUrl =
          this.apiUrl +
          `visits?search=&pageSize=4&type=0&lng=${this.globals.lang}&portal=${
          AppConstants.PORTAL_ID
          }&page=${page}&token=${this.globals.token}`;
        this.toursKey = "last-tours-group";
        this.logger.trace(this.ti, "URL: ", listUrl);
        break;

      case AppConstants.PAGE_SEARCH:
        listUrl =
          this.apiUrl +
          `visits?search=${search}&pageSize=4&type=0&lng=${this.globals.lang}&portal=${
          AppConstants.PORTAL_ID
          }&page=${page}&token=${this.globals.token}`;
        this.toursKey = "search-tours-group";
        this.logger.trace(this.ti, "URL: ", listUrl);
        break;


      default:
        break;
    }

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
  * Obtener los datos de un tour
  *
  * @param {any} page
  * @returns {Observable<string[]>}
  * @memberof RestApiProvider
  */
  getTour(tourId): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getTour";

    listUrl = `${this.apiUrl1}visitd/${tourId}/1/${this.globals.lang}`;

    this.logger.trace(this.ti, "URL: ", listUrl);
    this.toursKey = "tour_" + tourId;

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
  * Obtener listado de tours alrededor de un punto geográfico
  *
  * @param {any} page
  * @returns {Observable<string[]>}
  * @memberof RestApiProvider
  */
  getGeoTours(lat, lon, first: boolean): Observable<any> {
    let listUrl: string;
    let delayType;
    this.ti = this.logt + "getGeoTours";

    listUrl =
      this.apiUrl +
      `visitsg?search=&pageSize=${AppConstants.GEO_LIST_SIZE}&type=1&lng=${this.globals.lang}` +
      `&portal=${AppConstants.PORTAL_ID}&page=${AppConstants.GEO_KM_RAD_MAX}` +
      `&token=${this.globals.token}&lat=${lat}&lon=${lon}`;

    this.logger.trace(this.ti, "URL: ", listUrl);
    this.toursKey = "geo-tours-group";

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());

    // all - send new request to server everytime
    // expired - only when entry is expired
    if (first) {
      delayType = "all";
    } else {
      delayType = "expired";
    }
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
   * Obtener listado de tours de un usuario
   *
   * @param {any} page
   * @returns {Observable<string[]>}
   * @memberof RestApiProvider
   */
  getUserTours(userId: number, page: number): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getGeoTours";

    listUrl =
      this.apiUrl +
      `visits?search=&pageSize=6&type=0&lng=${this.globals.lang}&portal=${AppConstants.PORTAL_ID}` +
      `&page=${page}&token=${this.globals.token}&id_user=${userId}`;

    this.logger.trace(this.ti, "URL: ", listUrl);
    this.toursKey = "user-group-" + userId.toString();

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
 * Obtener listado de tours de un usuario
 *
 * @param {any} page
 * @returns {Observable<string[]>}
 * @memberof RestApiProvider
 */
  getAllUserTours(userId: number, page: number): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getGeoTours";

    listUrl =
      this.apiUrl +
      `visits?search=&pageSize=6&type=0&lng=${this.globals.lang}` +
      `&page=${page}&token=${this.globals.token}&id_user=${userId}`;

    this.logger.trace(this.ti, "URL: ", listUrl);
    this.toursKey = "all-user-group-" + userId.toString();

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60; // * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
   * Obtener listado de rutas recomendadas
   *
   * @param {any} page
   * @returns {Observable<string[]>}
   * @memberof RestApiProvider
   */
  getRoutes(page: number): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getRoutes";

    listUrl =
      this.apiUrl +
      `rroutes?pageSize=6&lng=${this.globals.lang}&portal=${AppConstants.PORTAL_ID}` +
      `&page=${page}&token=${this.globals.token}&type=0&lastUpdated=20070101`;

    this.logger.trace(this.ti, "URL: ", listUrl);
    this.toursKey = "routes-group";

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
 * Obtener listado de seguidores de un usuario
 *
 * @param {any} page
 * @returns {Observable<string[]>}
 * @memberof RestApiProvider
 */
  getFollow(userId: number, type: string): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getFollow";

    listUrl =
      this.apiUrl +
      `${type}?id_user=${userId}`;

    this.logger.trace(this.ti, "URL: ", listUrl);
    this.toursKey = "user-follow-" + userId.toString();

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
   * Leer comentarios de un tour
   *
   * @param {any} page
   * @returns {Observable<string[]>}
   * @memberof RestApiProvider
   */
  getComments(tourId, page, pageSize): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getComments";

    listUrl = this.apiUrl + `comments?id_visit=${tourId}&page=${page}&pageSize=${pageSize}`;

    let cacheKey = listUrl;
    let groupKey = "comments_key";

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
   * Leer areas de un tour
   * 
   * @param {any} tourId 
   * @returns {Observable<any>} 
   * @memberof RestApiProvider
   */
  getAreas(tourId): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getAreas";

    listUrl = `${this.apiUrl1}areas/${tourId}/${this.globals.lang}`;

    let cacheKey = listUrl;
    let groupKey = "areas_key";

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
   * Leer panos de un area de un tour
   *
   * @param {any} tourId 
   * @param {any} areaId 
   * @returns {Observable<any>} 
   * @memberof RestApiProvider
   */
  getPanosArea(tourId, areaId): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getAreas";

    listUrl = `${this.apiUrl1}visit/${tourId}/area/${areaId}/lng/${this.globals.lang}`;

    let cacheKey = listUrl;
    let groupKey = `key_${tourId}_${areaId}`;

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
   * Obtener los datos de un pnorama
   *
   * @param {*} panoId
   * @returns {Observable<any>}
   * @memberof RestApiProvider
   */
  getPanoData(panoId): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getAreas";

    listUrl = `${this.apiUrl1}panos/${panoId}/${this.globals.lang}`;

    return this.http.get(listUrl)
      .map(response => response.json());
  }

  /**
  * Obtener perfil de usuario
  *
  * @param {any} userId
  * @returns {Observable<string[]>}
  * @memberof RestApiProvider
  */
  getUserProfile(userId: number): Observable<any> {
    let listUrl: string;
    this.ti = this.logt + "getUserProfile";

    listUrl = `${this.apiUrl1}user?id_user=${userId}&token=${this.globals.token}&lng=${this.globals.lang}&portal=${AppConstants.PORTAL_ID}`;

    this.logger.trace(this.ti, "URL: ", listUrl);
    this.toursKey = "user-profile-group";

    let cacheKey = listUrl;
    let groupKey = this.toursKey;

    let request = this.http.get(listUrl).map(res => res.json());
    //return this.cache.loadFromObservable(cacheKey, request, groupKey);

    let delayType = "all"; // send new request to server everytime, if it's set to none it will send new request
    // only when entry is expired
    let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
    // Pasar el request por el cache de manera que se almacena en cache y se devuelve el resultado
    // si el resultado cambia se actualiza

    let response = this.cache.loadFromDelayedObservable(
      cacheKey,
      request,
      groupKey,
      ttl,
      delayType
    );

    return response;
  }

  /**
  * Añadir un comentario
  *
  * @param {number} value
  * @memberof UtilProvider
  */
  addComment(item: TourItem, value: string): Observable<any> {

    let link: string =
      AppConstants.W2V_API_URL1 + `comment`;

    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(link,
      JSON.stringify({
        id_visit: item.id,
        token: this.globals.token,
        text: value
      }), options);
  }

  /**
   * Enviar informe de usuario
   * 
   * @param {TourItem} item 
   * @param {string} kind 
   * @param {string} choice 
   * @param {string} desc 
   * @returns {Observable<any>} 
   * @memberof RestApiProvider
   */
  sendReport(item: TourItem, kind: number, choice: number, desc: string): Observable<any> {

    let link: string =
      AppConstants.W2V_API_URL1 + `report`;

    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(link,
      JSON.stringify({
        id_item: item.id,
        token: this.globals.token,
        item_type: kind,
        report_type: choice,
        description: desc
      }), options);
  }

  /**
  * Indicar si gusta el tour
  *
  * @param {number} value
  * @memberof UtilProvider
  */
  like(item: TourItem, value: boolean): Observable<any> {
    let val: string = value ? "true" : "false";

    let listUrl: string =
      AppConstants.W2V_API_URL1 +
      `like/${item.id}/${this.globals.token}/${val}`;

    return this.http.get(listUrl);
  }

  /**
  * Indicar si gusta el tour
  *
  * @param {number} value - true=seguir // false=dejar de seguir
  * @memberof UtilProvider
  */
  follow(id_user: number, value: boolean): Observable<any> {
    let val: string = value ? "true" : "false";

    let listUrl: string =
      AppConstants.W2V_API_URL1 +
      `follow/${id_user}/${this.globals.token}/${val}`;

    return this.http.get(listUrl);
  }

  /**
  * Incrementar contador de visualizaciones
  *
  * @param {number} tourId - Identidad del tour
  * @memberof UtilProvider
  */
  trackview(tourId: number) {
    this.ti = this.logt + "trackview";
    let listUrl: string =
      AppConstants.W2V_API_URL1 + `trackview/${tourId}`;

    this.http.get(listUrl).subscribe(
      data => {
        this.logger.debug(this.ti, "Tour visitado: ", tourId.toString());
      },
      err => {
        this.logger.error(this.ti, "Error: ", err);
      }
    );
  }

  /**
  * Obtener todos los panoramas de un tour ordenados por zonas
  *
  * @param {number} tourId - Identidad del tour
  * @memberof RestApiProvider
  */
  getAllPanosTour(tourId: string): Observable<any> {
    this.ti = this.logt + "getAllPanosTour";
    let areaId: number;
    let listUrl: string;
    let listUrl2: string;

    // Llamada para obtener las áreas de un tour
    listUrl = `${this.apiUrl1}areas/${tourId}/${this.globals.lang}`;
    listUrl2 = `${this.apiUrl1}visit/${tourId}/area/${areaId}/lng/${this.globals.lang}`;

    this.translate.get("hidden").subscribe(value => this.txtHidden = value);

    return this.http.get(this.apiUrl1 + 'areas/' + tourId + '/' + this.globals.lang)
      .map((res: any) => res.json())
      .mergeMap((are) => {
        if (are.Elems.length > 0) {
          let areas = are.Elems;
          // Agregar el área -1 para saber si hay panos ocultos
          areas.push({
            description: "",
            id_area: "-1",
            id_visit: areas[0].id_visit,
            name: this.txtHidden,
            thumbnail: areas[0].thumbnail
          });
          return Observable.forkJoin(
            areas.map((area) => {
              return this.http.get(this.apiUrl1 + 'visit/' + tourId + '/' + '/area/' + area.id_area + '/lng/' + this.globals.lang)
                .map((res) => {
                  let pano: any = res.json();
                  area.panos = pano.Panos;
                  return area;
                });
            })
          );
        }
      })
  }

  /**
  * Guardar ordenación de áreas y panoramas de un tour
  *
  * @param {string} tourId
  * @param {string} value
  * @returns {Observable<any>}
  * @memberof RestApiProvider
  */
  savePanosAreas(tourId: string, value: string): Promise<any> {

    let link: string =
      AppConstants.W2V_API_URL2 + `saveareas?idVisita=${tourId}&token=${this.globals.token}`;

    return new Promise((resolve, reject) => {

      let headers = new Headers({ "content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(link, JSON.stringify(value), options)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((data) => {

          this.logger.trace(this.ti, "Recibida respuesta: ", JSON.stringify(data));
          resolve();
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
  * Crear una nueva zona en un tour
  *
  * @param {string} tourId
  * @param {string} value
  * @returns {Observable<any>}
  * @memberof RestApiProvider
  */
  createArea(tourId: string, value: string): Promise<any> {

    let link: string =
      AppConstants.W2V_API_URL2 + `createarea?idVisita=${tourId}&token=${this.globals.token}`;

    return new Promise((resolve, reject) => {

      let headers = new Headers({ "content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(link, JSON.stringify(value), options)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((data) => {

          this.logger.trace(this.ti, "Recibida respuesta: ", JSON.stringify(data));
          resolve();
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
  * Borrar una zona en un tour
  *
  * @param {string} tourId
  * @param {string} value
  * @returns {Observable<any>}
  * @memberof RestApiProvider
  */
  deleteArea(tourId: string, value: string): Promise<any> {

    let link: string =
      AppConstants.W2V_API_URL2 + `removearea?idVisita=${tourId}&token=${this.globals.token}`;

    return new Promise((resolve, reject) => {

      let headers = new Headers({ "content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(link, JSON.stringify(value), options)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((data) => {

          this.logger.trace(this.ti, "Recibida respuesta: ", JSON.stringify(data));
          resolve();
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
  * Editar una zona en un tour
  *
  * @param {string} tourId
  * @param {string} areaId
  * @param {string} value
  * @returns {Promise<any>}
  * @memberof RestApiProvider
  */
  editArea(tourId: string, areaId: string, value: string): Promise<any> {

    let link: string =
      AppConstants.W2V_API_URL2 + `updatearea?idVisita=${tourId}&idArea=${areaId}&token=${this.globals.token}`;

    return new Promise((resolve, reject) => {

      let headers = new Headers({ "content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(link, JSON.stringify(value), options)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((data) => {

          this.logger.trace(this.ti, "Recibida respuesta: ", JSON.stringify(data));
          resolve();
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
   * Obtener la lista de hotspots de navegación que se inican en un panorama
   * 
   * @param {*} panoId
   * @returns {Promise<any>}
   * @memberof RestApiProvider
   */
  getHotSpots(panoId): Promise<any> {

    this.ti = this.logt + "getHotSpots";
    this.logger.debug(this.ti, "Entrada");

    return new Promise((resolve, reject) => {

      let apiURL: string = AppConstants.W2V_API_URL2 + `gethotspots?idPano=${panoId}`;
      this.logger.debug(this.ti, "URL: ", apiURL);

      this.http.get(apiURL)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .map(res => res.json())
        .subscribe((res) => {
          // Success          
          this.logger.trace(this.ti, "Recibida respuesta: ", JSON.stringify(res));
          resolve(res);

        }, (err) => {
          reject(err);
        });
    });
  }

  /**
   * editar hotspot
   *
   * @param {HotSpot} hp
   * @returns {Promise<any>}
   * @memberof RestApiProvider
   */
  editHotSpot(command: string, idVisit: string, hp: HotSpot): Promise<any> {

    this.ti = this.logt + "editHotSpot";
    // http://app.walk2view.com/app1/api/v2/hotspot?id=49699&com=d&idVisita=&p1=&p2=&a1=&a2=&name=&token=x06H79O4TkuKEk1PX3O6rg

    let link: string =
      AppConstants.W2V_API_URL2 + `hotspot?id=${hp.id}&com=${command}&idVisita=${idVisit}&p1=${hp.p1}&p2=${hp.p2}&a1=${hp.a1}&a2=${hp.a2}&name=${hp.name}&token=${this.globals.token}`;
    this.logger.debug(this.ti, 'link: ', link);

    return new Promise((resolve, reject) => {

      let headers = new Headers({ "content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(link, '', options)
        .timeout(AppConstants.HTTP_TIMEOUT)
        .subscribe((data) => {

          this.logger.trace(this.ti, "Recibida respuesta: ", JSON.stringify(data));
          resolve();
        }, (err) => {
          reject(err);
        });
    });
  }

  //============================================================================================
  /**
   *
   *
   * @private
   * @param {Response} res
   * @returns
   * @memberof RestApiProvider
   */
  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body || {};
  // }

  /**
   *
   *
   * @private
   * @param {(Response | any)} error
   * @returns
   * @memberof RestApiProvider
   */
  // private handleError(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || "";
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }
}
