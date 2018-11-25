import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Logger } from "../../providers/logger/logger";
import { TranslateService } from "@ngx-translate/core";
import { TourItem } from "../../models/tourItem";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";
import { Globals } from "../../providers/globals/globals";
import { GeoProvider } from "../../providers/geo/geo";

/**
 * Página de listado de comentarios de un tour
 * 
 * @export
 * @class CommentsPage
 */
@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  public tour: TourItem;
  comments: string[];
  logt: string;
  ti: string;
  isLogged: boolean;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  data: any;
  commentText: any;
  httpError: string;
  httpErrorDesc: string;
  closeButton: string;

  /**
   * Creates an instance of CommentsPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {Logger} logger 
   * @param {TranslateService} translate 
   * @param {RestApiProvider} restApi 
   * @param {UtilProvider} util 
   * @param {Globals} globals 
   * @memberof CommentsPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private logger: Logger,
    public restApi: RestApiProvider,
    public util: UtilProvider,
    private globals: Globals,
    public geo: GeoProvider
  ) {
    this.logt = "TourDetailPage | ";
    this.ti = this.logt + "constructor";
    this.tour = navParams.get("item");
    this.logger.debug(this.ti, "Tour title: ", this.tour.title);
    this.translate.get("http_error").subscribe(value => {
      this.httpError = value;
    });
    this.translate.get("http_error_desc").subscribe(value => {
      this.httpErrorDesc = value;
    });
    this.translate.get("close_button").subscribe(value => {
      this.closeButton = value;
    });
  }

  /**
   * It’s fired when entering a page, before it becomes the active one. 
   * Use it for tasks you want to do every time you enter in the view 
   * (setting event listeners, updating a table, etc.).
   * 
   * @memberof TourDetailPage
   */
  ionViewWillEnter() {
    this.isLogged = this.globals.isLogged;

    // Cargar los comentarios
    this.getComments();
  }

  /**
 * Obtener el listado de comentarios
 * 
 * @param {number} tourId 
 * @memberof CommentsPage
 */
  getComments() {
    // Cargar los comentarios
    this.restApi.getComments(this.tour.id, this.page, 5).subscribe(res => {
      this.data = res;
      this.comments = this.data.Elems;
      this.perPage = this.data.pagesize;
      this.totalData = this.data.totalItems;
      this.totalPage = this.data.totalPages;
    }, (err) => {
      this.logger.error(this.ti, "Error: ", err);
    });
  }

  /**
 * Ejecutar al llegar al final de la página, cargar más datos
 *
 * @param {any} infiniteScroll
 * @memberof BestPage
 */
  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    this.ti = this.logt + "doInfinite";
    this.logger.debug(this.ti, "Nueva página: ", this.page.toString());


    setTimeout(() => {
      this.restApi.getComments(this.tour.id, this.page, 5).subscribe(res => {
        this.data = res;
        this.perPage = this.data.pagesize;
        this.totalData = this.data.totalItems;
        this.totalPage = this.data.totalPages;
        for (let i = 0; i < this.data.Elems.length; i++) {
          this.util.addToArray(this.comments, this.data.Elems[i])
        }
        this.logger.debug(this.ti, "la operación asíncrona ha finalizado");

      }, err => {
        this.logger.error(this.ti, "Error: ", err);
      });
    }, 500);

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
   *
   *
   * @param {*} comment
   * @returns
   * @memberof TourDetailPage
   */
  getCommentAvatar(comment: any) {
    let myStyles = {
      "background-image": "url('" + comment.avatar + "')"
    };
    return myStyles;
  }

  /**
      *
      *
      * @param {*} comment
      * @returns
      * @memberof TourDetailPage
      */
  getUserAvatar() {
    let myStyles = {
      "background-image": "url('" + this.globals.loggedUser.photo + "')"
    };
    return myStyles;
  }


  /**
   * Enviar comentario
   * 
   * @memberof TourDetailPage
   */
  addComment(item: TourItem) {
    this.ti = this.logt + "addComment";

    this.restApi.addComment(item, this.commentText).subscribe(
      data => {
        // Leer y recargar los comentarios del tour
        this.logger.trace(this.ti, "Comentario agregado: ", this.commentText);
        this.getComments();
        this.tour.total_comentarios += 1;
        // Vaciar el casillero de entrada de texto
        this.commentText = "";
      },
      err => {
        this.logger.error(this.ti, "Error: ", err);
        // Mostrar mensaje de error
        this.util.presentAlert(this.httpError, this.httpErrorDesc, this.closeButton);
      }
    );
  }

}
