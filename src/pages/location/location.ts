import { Component } from "@angular/core";
import { Logger } from "../../providers/logger/logger";
//import { IPositionParameter } from "../../models/position-parameter.model";
import { Geolocation } from "@ionic-native/geolocation";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { CacheService } from "ionic-cache";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-location",
  templateUrl: "location.html",
  providers: [Geolocation]
})
export class LocationPage {
  //items: IPositionParameter[] = [];
  logt: string;
  ti: string;

  films: Observable<any>;
  filmsKey = "my-films-group";

  constructor(
    private logger: Logger,
    private geolocation: Geolocation,
    private http: Http,
    private cache: CacheService,
    private toastCtrl: ToastController
  ) {
    this.logt = "LocationPage | ";
    this.ti = this.logt + "constructor";
    this.logger.debug(this.ti, "Página creada");
  }

  ionViewDidLoad() {
    this.ti = this.logt + "ionViewDidLoad";
    this.logger.debug(this.ti, "ionViewDidLoad LocationPage");
    this.loadFilms();
  }

  btnGetLocation() {
    this.ti = this.logt + "btnGetLocation";
    this.logger.debug(this.ti, "Botón pulsado");

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    try {
      // get current position
      this.geolocation.getCurrentPosition(options).then(pos => {
        this.logger.log(
          this.ti,
          "lat: " + pos.coords.latitude + ", lon: " + pos.coords.longitude
        );
      });
    } catch (e) {
      this.logger.error(this.ti, "Error al pedir ubicación", e.toString());
    }
  }

  // Load either from API or Cache
  loadFilms(refresher?) {
    let url = "http://swapi.co/api/films/";
    let req = this.http.get(url).map(res => {
      let toast = this.toastCtrl.create({
        message: "New data from API loaded",
        duration: 2000
      });
      toast.present();

      return res.json().results;
    });

    // Specify custom TTL if you want
    let ttl = 5;

    if (refresher) {
      // Reload data even if it is cached
      let delayType = "all";
      this.films = this.cache.loadFromDelayedObservable(
        url,
        req,
        this.filmsKey,
        ttl,
        delayType
      );

      // Hide the refresher once loading is done
      this.films.subscribe(data => {
        refresher.complete();
      });
    } else {
      // Load with Group key and custom TTL
      this.films = this.cache.loadFromObservable(url, req, this.filmsKey, ttl);

      // Or just load without additional settings
      // this.films = this.cache.loadFromObservable(url, req);
    }
  }

  // Invalidate for a specific group key
  invalidateCache() {
    this.cache.clearGroup(this.filmsKey);
  }

  // Pull to refresh and force reload
  forceReload(refresher) {
    this.loadFilms(refresher);
  }
}
