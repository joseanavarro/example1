import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProfile } from "../../models/userProfile";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-my-published-photos',
  templateUrl: 'my-published-photos.html',
})
export class MyPublishedPhotosPage {
  userId: number;
  public userProfile: UserProfile = new UserProfile;
  logt: string;
  ti: string;
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public restApi: RestApiProvider,
    private globals: Globals,
    public util: UtilProvider,
    public ga: GoogleAnalytics
  ) {
    this.logt = "MyPublishedPhotosPage | ";
    this.ti = this.logt + "constructor";
  }

  ionViewDidLoad() {
  }

  /**
* It’s fired when entering a page, before it becomes the active one. 
* Use it for tasks you want to do every time you enter in the view 
* (setting event listeners, updating a table, etc.).
* 
* @memberof UserProfilePage
*/
  ionViewWillEnter() {
    this.userId = Number(this.globals.loggedUser.userid);
    //----------------------------------
    // Cargar tours al crear la página
    //----------------------------------
    this.getTours();

    this.ga.trackView('UserProfilePublicationsPage');
  }

  /**
  * Obtener el listado de tours
  *
  * @memberof BestPage
  */
  getTours(refresher = null) {
    this.restApi.getAllUserTours(this.userId, this.page).subscribe(res => {
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
        this.restApi.getUserTours(this.userId, this.page).subscribe(res => {
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
