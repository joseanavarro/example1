import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ImageResizer } from '@ionic-native/image-resizer';
import { TranslateService } from "@ngx-translate/core";
import { UUID } from 'angular2-uuid';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PanoData } from '../../models/panoData';
import { AppConstants } from '../../providers/app-constants/app-constants';
import { CameraApiProvider } from '../../providers/camera-api/camera-api';
import { CameraProvider } from '../../providers/camera/camera';
import { DatabaseService } from "../../providers/database-service/database-service";
import { GeoProvider } from "../../providers/geo/geo";
import { Globals } from "../../providers/globals/globals";
import { LoadingProvider } from '../../providers/loading/loading';
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-new-pano',
  templateUrl: 'new-pano.html',
})
export class NewPanoPage {

  logt: string;
  ti: string;
  hdr: string;
  tourTitle: string;
  togglecolor: string;
  panoNum: number;
  photoDone: boolean;
  photoDoing: boolean;
  taking_photo: string;
  taking_photo_desc: string;
  errCamera: string;
  errCameraNotOk: string;
  btnClose: string;
  stop: boolean;
  checkInterval: any;
  panoData: PanoData = new PanoData();
  panoTitle: string;
  filename: string;
  dbError: string;
  contactSupport: string;
  photoDoneTxt: string;
  photoDoneDesc: string;
  errorPhotoDone: string;
  errorPhotoDoneDesc: string;
  downloading_photo_desc: string;
  thumbnail: string;

  constructor(
    public navCtrl: NavController,
    public logger: Logger,
    public navParams: NavParams,
    public util: UtilProvider,
    public globals: Globals,
    public db: DatabaseService,
    public translate: TranslateService,
    public ga: GoogleAnalytics,
    public cameraApi: CameraApiProvider,
    public camService: CameraProvider,
    public platform: Platform,
    public file: File,
    public imageResizer: ImageResizer,
    public loading: LoadingProvider,
    public geo: GeoProvider
  ) {
    this.logt = "NewTourPage | ";
    this.ti = this.logt + "constructor";
    // Cargar traducciones de las ventanas de información
    this.translate.get("taking_photo").subscribe(value => this.taking_photo = value);
    this.translate.get("taking_photo_desc").subscribe(value => this.taking_photo_desc = value);
    this.translate.get("err_camera").subscribe(value => this.errCamera = value);
    this.translate.get("err_camera_not_ok").subscribe(value => this.errCameraNotOk = value);
    this.translate.get("close_button").subscribe(value => this.btnClose = value);
    this.translate.get("db_error").subscribe(value => this.dbError = value);
    this.translate.get("contact_support").subscribe(value => this.contactSupport = value);
    this.translate.get("photo_done").subscribe(value => this.photoDoneTxt = value);
    this.translate.get("photo_done_desc").subscribe(value => this.photoDoneDesc = value);
    this.translate.get("error_photo_done").subscribe(value => this.errorPhotoDone = value);
    this.translate.get("error_photo_done_desc").subscribe(value => this.errorPhotoDoneDesc = value);
    this.translate.get("downloading_photo_desc").subscribe(value => this.downloading_photo_desc = value);
  }

  /**
   * Se ejecuta siempre que se entra en la página
   * 
   * @memberof NewPanoPage
   */
  ionViewWillEnter() {
    this.ti = this.logt + "ionViewWillEnter";
    this.hdr = this.globals.filter;
    this.tourTitle = this.globals.tourTitle;
    this.checkInterval = null;
    // Leer parámetros de entrada
    this.panoNum = this.navParams.get("panoId");
    this.globals.panoNum = this.panoNum;
    this.photoDoing = false;

    this.logger.debug(this.ti, "Título del tour: " + this.globals.tourTitle);
    this.logger.debug(this.ti, "Título del panorama: " + this.panoTitle);

    if (this.globals.cfgGetLocation) {
      // El usuario quiere obtener la localización del tour
      this.geo.findLocation()
        .then((loc) => {
          this.globals.lat = loc.latitude;
          this.globals.lon = loc.longitude;
          this.globals.alt = loc.altitude;
          this.ga.trackEvent(AppConstants.SC_LOCATION, "found", loc.toString());
          this.logger.debug(this.ti, "Obtenida localización");
        })
        .catch((error) => {
          // No se puede obtener la localización
          this.ga.trackEvent(AppConstants.SC_LOCATION, "not found");
          this.logger.debug(this.ti, "No se puede obtener la localización, mostrar mensaje de error: ", error);
        })
    }
  }

  /**
  * Fired when you leave a page, before it stops being the active one. 
  * Use it for things you need to run every time you are leaving a page 
  * (deactivate event listeners, etc.).
  * 
  * @memberof TourDetailPage
  */
  ionViewWillUnload() {
    this.stopCheckPhoto(0);
  }

  /**
   * Actualizar HDR en la cámara
   * 
   * @memberof NewPanoPage
   */
  updateHDR(selectedValue: string) {
    this.ti = this.logt + "updateHDR";
    this.globals.filter = selectedValue;
    this.camService.updateHdr(selectedValue)
      .then(() => {
        this.logger.debug(this.ti, "Cambiada opción HDR");
      },
        (err) => {
          this.logger.error(this.ti, 'Error en cambio opción HDR');
        });
  }

  //---------------------------------------
  // Realizar la foto
  //---------------------------------------
  takePanorama() {
    this.ti = this.logt + "takePanorama";
    this.photoDone = false;

    if (this.globals.cameraConnected) {
      this.logger.debug(this.ti, 'Comprobar estado de conexión');

      this.camService.checkCamera()
        .then(() => {
          this.globals.takingPhoto = true;
          this.globals.cameraConnected = true;
          this.logger.debug(this.ti, 'Conexión camara OK');
          this.loading.presentLoader(this.taking_photo, 5);

          this.camService.updateHdr(this.globals.filter)
            .then(() => {
              this.logger.debug(this.ti, "Cambiada opción HDR");
              this.cameraApi.takePhoto()
                .then((data) => {
                  this.globals.photoId = data;
                  this.logger.trace(this.ti, 'Foto realizada, id = ' + this.globals.photoId);
                  this.globals.photoName = UUID.UUID();
                  this.logger.trace(this.ti, 'Foto realizada, nuevo nombre = ' + this.globals.photoName);
                  // Bucle de comprobación del estado de la foto, cada segundo
                  // se comprueba el estado
                  this.checkPhoto();
                },
                  (err) => {
                    this.logger.error(this.ti, 'Error en takePanorama: ' + err);
                    this.globals.takingPhoto = false;
                    this.loading.presentLoader('', 0);;
                    this.util.presentAlert(this.errCamera, this.errCameraNotOk, this.btnClose);
                  });
            },
              (err) => {
                this.globals.takingPhoto = false;
                this.logger.error(this.ti, 'Error en cambio opción HDR');
              });
        },
          (err) => {
            this.globals.takingPhoto = false;
            this.globals.cameraConnected = false;
            this.logger.error(this.ti, 'Conexión camara Error');
            this.util.presentAlert(this.errCamera, this.errCameraNotOk, this.btnClose);
          });
    }
  }

  /**
   * Comprobación de foto realizada
   * 
   * @returns 
   * @memberof NewPanoPage
   */
  checkPhoto() {
    this.ti = this.logt + "checkPhoto";
    // No iniciar nueva comprobación si hay una en marcha
    if (this.checkInterval) {
      return;
    }

    this.loading.presentLoader(this.taking_photo + ' ' + this.taking_photo_desc, 10)
    this.photoDoing = true;

    // Repetir cada 2 segundos, y hacerlo como máximo 30 veces
    this.checkInterval = setInterval(() => {
      /*jshint loopfunc: true */
      this.cameraApi.checkPhoto(this.globals.photoId)
        .then(
          (data) => {
            if (data['state'] === 'done') {
              this.logger.info(this.ti, 'CheckPhoto OK');
              this.panoData.fileUrl = data['results'].fileUrl;
              this.panoData.panoTitle = this.panoTitle;
              this.loading.presentLoader('', 0);
              this.stopCheckPhoto(this.globals.photoId);
            } else {
              this.logger.trace(this.ti, 'Estado foto: ', data['state']);
              this.loading.presentLoader('', 0);
            }
          },
          (err) => {
            this.globals.takingPhoto = false;
            this.logger.error(this.ti, 'Error en checkPhoto: ' + err);
            this.loading.presentLoader('', 0);
            this.util.presentAlert(this.errCamera, this.errCameraNotOk, this.btnClose);
            this.stopCheckPhoto(0);
          });
    }, 1000 * 2, 30);
  };

  /**
   * Descarga del panorama correcta
   * 
   * @param {any} imagePath 
   * @memberof NewPanoPage
   */
  saveImageSuccess(imagePath: string) {
    this.ti = this.logt + "saveImageSuccess";
    this.logger.trace(this.ti, imagePath);
    this.logger.debug(this.ti, 'Save file ' + this.filename + ' success!');
    this.globals.takingPhoto = false;
    let that = this;

    if (that.globals.cfgDelCameraFoto) {
      that.deleteCameraPhoto();
    }

    this.db.addTour(
      that.globals.tourNum,
      that.globals.panoNum,
      that.panoTitle,
      imagePath,
      that.globals.lat,
      that.globals.lon,
      AppConstants.PANO_DOWNLOADED,
      that.thumbnail
    )
      .then(
        () => {
          that.logger.debug(that.ti, "Registro de nuevo pano agregado a BD");
          that.globals.newPhotos = true;
          that.photoDone = true;
          that.photoDoing = false;

          this.loading.presentLoader('', 0);
          let panoDoneMessage = '<img src="' + that.thumbnail + '" style="width:100%;" /> <br /><br />' + that.photoDoneDesc + '<br />';

          that.util.presentAlert(that.photoDoneTxt, panoDoneMessage, that.btnClose);
        },
        () => {
          that.logger.debug(that.ti, "No es posible agregar registro a la BD");
          that.util.presentAlert(that.dbError, that.contactSupport, that.btnClose);
        });

  }

  /**
   * Descarga del panorama incorrecta
   * 
   * @param {any} err 
   * @memberof NewPanoPage
   */
  saveImageError(err: any) {
    this.logger.error(this.ti, err);
    this.globals.takingPhoto = false;
    this.loading.presentLoader('', 0);
    this.util.presentAlert(this.errorPhotoDone, this.errorPhotoDoneDesc, this.btnClose);
  }

  /**
   * Obtener la miniatura de la última foto realizada. Esta miniatura la genera la 
   * propia cámara. Viene en el listado de fotos. El listado de fotos viene ordenado
   * de forma inversa, la foto más reciente en el primer elemento del array, por eso
   * la miniatura de la última foto que hemos hecho está en el índice 0 del array
   * entries[0].thumbnail
   * 
   * @param {string} url 
   * @returns 
   * @memberof NewPanoPage
   */
  saveThumbnail(url: string) {
    this.ti = this.logt + "saveThumbnail";
    let that = this;
    return new Promise((resolve, reject) => {
      this.cameraApi.listFiles()
        .then(
          (data) => {
            // Obtener la cadena Base64 con la miniatura
            var base64Img = data['results'].entries[0].thumbnail;
            // Guardar thumbnail en la variable
            this.thumbnail = "data:image/png;base64," + base64Img;
            resolve();
          },
          (err) => {
            that.logger.error(that.ti, 'List files Error');
            reject();
          });
    });
  }

  /**
   * Detener comprobación de foto realizada
   * 
   * @param {any} id 
   * @memberof NewPanoPage
   */
  stopCheckPhoto(id: number) {
    this.ti = this.logt + "stopCheckPhoto";
    var imageFile;
    let that = this;
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;

      if (id !== 0) {
        this.logger.debug(this.ti, "Panorama realizado");

        this.filename = this.panoData.fileUrl.substring(this.panoData.fileUrl.lastIndexOf('/') + 1);
        this.loading.presentLoader(this.taking_photo + ' ' + this.downloading_photo_desc, 10);

        // Guardar imagen en galería de imágenes
        this.util.downloadPanorama(this.panoData.fileUrl)
          .then(
            (data) => {
              imageFile = data;
              that.logger.info(this.ti, 'Foto: ' + data + ' descargada OK');

              that.saveThumbnail(data.toString())
                .then(
                  (data) => {
                    that.logger.info(this.ti, 'saveTumbnail OK');
                    that.loading.presentLoader('', 0);;
                    that.saveImageSuccess(imageFile);
                  },
                  (err) => {
                    that.logger.error(this.ti, 'saveTumbnail Error');
                    that.loading.presentLoader('', 0);;
                    that.saveImageError(err);
                  });
            },
            (err) => {
              that.logger.error(this.ti, 'Error al descargar foto: ' + err);
              that.saveImageError(err);
            });
      }
    }
  }

  /**
   * Borrar el panorama descargado en la cámara
   * 
   * @memberof NewPanoPage
   */
  deleteCameraPhoto() {
    this.ti = this.logt + "deleteCameraPhoto";
    let that = this;
    if (that.globals.cfgDelCameraFoto) {
      that.cameraApi.delPhoto(that.panoData.fileUrl)
        .then(
          (data) => {
            that.logger.info(that.ti, 'Foto ' + that.panoData.fileUrl + ' borrada OK');
          },
          (err) => {
            that.logger.error(that.ti, 'Error al borrar foto: ', err);
          });
    }
  }

  /**
   * Continuar con el siguiente panorama
   * 
   * @memberof NewPanoPage
   */
  nextPanorama() {
    this.ti = this.logt + "nextPanorama";
    this.logger.info(this.ti, 'next panorama, pano actual: ' + this.panoNum);
    // Obtener la identidad del último panorama del tour
    this.navCtrl.push("NewPanoPage", { panoId: this.panoNum + 1 });
  };

  /**
   * Finalizar el tour
   * 
   * @memberof NewPanoPage
   */
  confirmEndTour() {
    this.ti = this.logt + "confirmEndTour";

    this.logger.debug(this.ti, "Finalizar el tour");
    // Actualizar registro en BD
    this.db.finishTour(this.globals.tourNum);
    this.globals.makingTour = false;
    this.navCtrl.setRoot("CameraPage");
  };

}
