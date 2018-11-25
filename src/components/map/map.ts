import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import leaflet from "leaflet";
import 'rxjs/add/operator/toPromise';
import { TourData } from "../../models/tourData";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { GeoProvider } from "../../providers/geo/geo";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnChanges {
  // Parámetros de entrada
  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number;
  @Input() force: boolean;
  @Input() edit: boolean;
  // Datos de salida del componente
  @Output() newLocation: EventEmitter<TourData> = new EventEmitter<TourData>();

  public map: leaflet.Map = null;
  center: leaflet.PointTuple;
  public tour: TourItem;
  tours: TourItem[];
  logt: string;
  ti: string;
  greenIcon: leaflet.Icon;
  blueIcon: leaflet.Icon;
  prevPoint: leaflet.LatLng = leaflet.latLng(0.0, 0.0);
  actPoint: leaflet.LatLng;
  apiUrl = AppConstants.W2V_API_URL2;
  loading: any;
  loadingTxt: string;
  popup2: string;
  httpError: string;
  httpErrorDesc: string;
  closeButton: string;
  centerMarker = leaflet.Marker;
  first: boolean;

  @ViewChild('mapDiv') mapContainer;
  /**
   * Creates an instance of MapComponent.
   * @param {Logger} logger 
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {ElementRef} elementRef 
   * @param {RestApiProvider} restApi 
   * @param {UtilProvider} util 
   * @param {Globals} globals 
   * @param {Http} http 
   * @param {LoadingController} loadingCtrl 
   * @param {TranslateService} translate 
   * @memberof MapComponent
   */
  constructor(
    private logger: Logger,
    public navCtrl: NavController,
    public navParams: NavParams,
    public elementRef: ElementRef,
    public restApi: RestApiProvider,
    public util: UtilProvider,
    public globals: Globals,
    public http: Http,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public geo: GeoProvider
  ) {
    this.logt = "MapComponent | ";
    this.ti = this.logt + "constructor";

    this.loading = this.loadingCtrl.create();
    this.translate.get("touch_to_go").subscribe(value => this.popup2 = value);
    this.translate.get("loading").subscribe(value => this.loadingTxt = value);
    this.translate.get("http_error").subscribe(value => this.httpError = value);
    this.translate.get("http_error_desc").subscribe(value => this.httpErrorDesc = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
  }

  ionViewWillEnter() {
    this.first = true;
  }

  ngAfterViewInit() {
    //set map center
    this.center = [this.lat, this.lon];
    //setup leaflet map
    this.initMap();
  }

  /**
   * Detectar los cambios en los valores de entrada del componente
   * 
   * @param {SimpleChanges} changes 
   * @memberof MapComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    this.ti = this.logt + "ngOnChanges";
    let lat;
    let lon;
    let zoom;
    if (this.first) {
      this.first = false;
    } else {
      // changes.prop contains the old and the new value...
      for (let propName in changes) {
        let change = changes[propName];
        let curVal = change.currentValue;
        let prevVal = change.previousValue;
        this.logger.debug(this.ti, 'Nueva coordenada: ' + propName + "  -prev: " + prevVal);
        this.logger.debug(this.ti, 'Nueva coordenada: ' + propName + "  -new: " + curVal);
        if (propName === "lat") {
          lat = curVal;
        }
        if (propName === "lon") {
          lon = curVal;
        }
        if (propName === "zoom") {
          zoom = curVal;
        }
      }
      if (this.edit && this.map !== null) {
        // Centrar el mapa
        this.map.panTo(new leaflet.LatLng(lat, lon));
        // colocar icono en el centro
        this.addCenterMarker(lat, lon);
      }
    }
  }

  /**
   * Inicializar mapa
   * 
   * @memberof DetailMapPage
   */
  initMap() {

    this.map = leaflet.map(this.mapContainer.nativeElement)
      .setView([this.lat, this.lon], this.zoom);

    //Add OSM Layer
    leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    // Definir los iconos
    this.greenIcon = new leaflet.Icon({
      iconUrl: "assets/imgs/marker-icon-green.png",
      shadowUrl: "assets/imgs/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    if (this.edit) {
      // colocar icono en el centro
      this.addCenterMarker(this.lat, this.lon);
    }
    else {
      this.blueIcon = new leaflet.Icon({
        iconUrl: "assets/imgs/marker-icon-blue.png",
        shadowUrl: "assets/imgs/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Generar los puntos del mapa
      this.getTours(this.lat, this.lon, this.force);
    }

    // Evento de mover el mapa
    this.map.on('dragend', (e) => {
      this.ti = this.logt + "map.dragend";
      this.logger.error(this.ti, 'centro movido: ' + this.map.getCenter().lat + ", " + this.map.getCenter().lng);
      if (this.edit) {
        // colocar icono en el centro
        this.addCenterMarker(this.map.getCenter().lat, this.map.getCenter().lng);
      } else {
        // Generar los puntos del mapa
        this.getTours(this.map.getCenter().lat, this.map.getCenter().lng, this.force);
      }

    });

  }

  /**
  * Ejecutar cuando se toca dos veces seguidas un marcador
  * 
  * @param {any} point 
  * @memberof DetailMapPage
  */
  clickOnMarker(point: leaflet.LatLng) {

    let listUrl: string;
    this.ti = this.logt + "clickOnMarker";
    // Pedir un solo tour por coordenadas geográficas
    listUrl =
      this.apiUrl +
      `visitsg?search=&pageSize=1&type=1&lng=${this.globals.lang}&portal=${AppConstants.PORTAL_ID}` +
      `&page=1&token=${this.globals.token}&lat=${point.lat}&lon=${point.lng}`;

    this.http.get(listUrl)
      .toPromise()
      .then((res) => { // Success
        this.logger.debug(this.ti, "Punto recibido: " + res.json());
        let clickedItem: TourItem = res.json().Elems[0];

        this.navCtrl.setRoot("TourDetailPage", { item: clickedItem, root: true })
          .then(() => {
          });
      }, (error) => {
        // Mostrar mensaje de error
        this.util.presentAlert(this.httpError, this.httpErrorDesc, this.closeButton);
      });
  }

  /**
  * Generar puntos en el mapa a partir del listado de tours
  * 
  * @memberof BestPage
  */
  getTours(lat, lon, force) {
    let i = 0;
    this.ti = this.logt + "getTours";
    this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);

    this.restApi.getGeoTours(lat, lon, force).subscribe(res => {
      this.tours = res.Elems;
      // Crear un marcador para cada item recibido
      for (i = 0; i < this.tours.length; i++) {
        let marker: leaflet.Marker;
        let point = [this.tours[i].lat, this.tours[i].lon];
        // Añadir popup
        let popupLink = `<b>${this.tours[i].title}</b><br/><br/>
               <img src='${AppConstants.WEB_SERVER_URL}thumbnail.aspx?p_registro=${this.tours[i].id_pano}&p=1&t=10' width='100px'/>`;

        let popupOptions =
          {
            'maxWidth': '100',
            'className': 'custom',
            'autoPan': true,
            'autoPanPadding': 5
          };

        if (i === 0) {
          marker = new leaflet.Marker(point, { icon: this.greenIcon });
          this.map.addLayer(marker);
          // añadir popup abierto
          marker
            .bindPopup(popupLink, popupOptions)
            .addTo(this.map).openPopup()
            .on('click', () => {
              this.actPoint = marker.getLatLng();
              this.logger.debug(this.ti, "Click en marcador: " + this.actPoint);
              if (this.prevPoint === this.actPoint) {
                this.logger.debug(this.ti, "Mismo punto !! ");
                // Al hacer click dos veces en el mismo marcador, saltamos al detalle del pano
                marker.bindTooltip("<h2>" + this.loadingTxt + "</h2>").openTooltip();
                this.clickOnMarker(this.actPoint);
              } else {
                this.prevPoint = this.actPoint;
              }
            });
        } else {
          marker = new leaflet.Marker(point, { icon: this.blueIcon });
          this.map.addLayer(marker);
          // añadir popup cerrado
          marker
            .bindPopup(popupLink + this.popup2, popupOptions)
            .addTo(this.map)
            .on('click', () => {
              this.actPoint = marker.getLatLng();
              this.logger.debug(this.ti, "Click en marcador: " + this.actPoint);
              if (this.prevPoint === this.actPoint) {
                this.logger.debug(this.ti, "Mismo punto !! ");
                // Al hacer click dos veces en el mismo marcador, saltamos al detalle del pano
                marker.bindTooltip("<h2>" + this.loadingTxt + "</h2>").openTooltip();
                this.clickOnMarker(this.actPoint);
              } else {
                this.prevPoint = this.actPoint;
              }
            });
        }
      }
    }, error => (this.logger.error(this.ti, "Error")));
  }

  /**
    * Añadir marcador en el centro del mapa
    * 
    * @param {number} lati 
    * @param {number} longi 
    * @memberof MapEditComponent
    */
  addCenterMarker(lati: number, longi: number) {
    this.ti = this.logt + "addCenterMarker";

    let point = [lati, longi];
    let location: TourData = new TourData();

    this.geo.reverseGeoCoding(lati, longi)
      .then((result) => {
        location.description = result.location;
        location.city = result.City;
        location.country = result.Country;
        location.street = result.street;
        location.postal_code = result.postalCode;
        location.lat = lati.toString();
        location.lon = longi.toString();
        // Emitir evento para que el padre pueda recoger la localización
        this.newLocation.emit(location);

        // Opciones de la ventana emergente
        let popupLink = `<b>${location.description}</b>`;

        let popupOptions =
          {
            'maxWidth': '100',
            'className': 'custom',
            'autoPan': true,
            'autoPanPadding': 5
          };

        // Borrar el anterior marcador
        if (this.centerMarker !== undefined) {
          this.map.removeLayer(this.centerMarker);
        };
        // Añadir de nuevo el marcador
        this.centerMarker = new leaflet.Marker(point, { icon: this.greenIcon });
        this.map.addLayer(this.centerMarker);
        this.centerMarker
          .bindPopup(popupLink, popupOptions)
          .addTo(this.map).openPopup();
      })
      .catch((error) => {
        this.logger.error(this.ti, "Error en petición HTTP", JSON.stringify(error));
      });


  }

}
