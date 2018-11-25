import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { TranslateService } from "@ngx-translate/core";
import { UUID } from 'angular2-uuid';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppConstants } from '../../providers/app-constants/app-constants';
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-publish2',
  templateUrl: 'publish2.html',
})
export class Publish2Page {

  image: string;
  origImage: string;
  name: string;
  ti: string;
  logt: string;
  txtCloseButton: string;
  txtPhotoCopied: string;
  txtPhotoCopied_desc: string;

  constructor(
    public navCtrl: NavController,
    public db: DatabaseService,
    public logger: Logger,
    public globals: Globals,
    public util: UtilProvider,
    public translate: TranslateService,
    public platform: Platform,
    public navParams: NavParams,
    public file: File
  ) {
    this.logt = 'Publish2Page';
    this.image = this.navParams.get("image");
    this.origImage = this.navParams.get("origimg");

    this.translate.get("accept").subscribe(value => this.txtCloseButton = value);
    this.translate.get("photo_copied").subscribe(value => this.txtPhotoCopied = value);
    this.translate.get("photo_copied_desc").subscribe(value => this.txtPhotoCopied_desc = value);
  }

  /**
   * Copiar el panorama seleccionado en la zona de publicación
   *
   * @memberof Publish2Page
   */
  publishPano() {

    // Generar un nombre para el fichero de imagen destino
    this.globals.photoName = UUID.UUID();
    let destfilename = this.globals.photoName + ".jpg"
    // Definir el directorio destino de la copia
    let destimagePath;
    if (this.platform.is('android')) {
      if (this.globals.cfgSaveToExternal) {
        destimagePath = this.file.externalDataDirectory + AppConstants.PHOTO_FOLDER;
      } else {
        destimagePath = this.file.dataDirectory + AppConstants.PHOTO_FOLDER;
      }
    } else {
      destimagePath = this.file.dataDirectory + AppConstants.PHOTO_FOLDER;
    }
    this.logger.debug(this.ti, "Carpeta de copia: ", destimagePath)
    // Obtener el nombre del archivo de origen
    let tempStr = this.origImage.split('/');
    let imageName = tempStr[tempStr.length - 1];
    // Obtener path de origen
    let imagePath = this.platform.is('android') ? this.image.replace(imageName, '') :
      'file://' + this.image.replace(imageName, '');

    let imageOrig = imageName.split('?')[0];

    // Copiar el panorama seleccionado a la zona de publicación
    this.file.copyFile(imagePath, imageOrig, destimagePath, destfilename)
      .then(() => {
        // Si la copia es correcta creamos el registro de Tour 
        this.storeNewTour()
          .then(() => {
            // Ahora creamos el registro de pano
            if (this.platform.is('ios')) {
              destimagePath += destfilename;
              destimagePath = destimagePath.replace(/^file:\/\//, '');
            } else {
              destimagePath += '/' + destfilename;
            }

            this.storeNewPano(destimagePath)
              .then(() => {
                // Mostramos mensaje de información y saltamos a la página de 'Mis Fotos'
                this.util.presentAlert(this.txtPhotoCopied, this.txtPhotoCopied_desc, this.txtCloseButton);
                this.navCtrl.setRoot("MyPhotosPage");
              }, (err) => {
                this.logger.error(this.ti, "Error en la base de datos", JSON.stringify(err));
              });
          }, (err) => {
            this.logger.error(this.ti, "Error en la base de datos", JSON.stringify(err));
          });
      }, (err) => {
        this.logger.error(this.ti, "Error en la base de datos", JSON.stringify(err));
      });
  }

  /**
   * Iniciar un tour nuevo asociado a la foto seleccionada
   * 
   * @memberof NewTourPage
   */
  storeNewTour(): Promise<any> {
    this.ti = this.logt + "startNewTour";

    return new Promise((resolve, reject) => {
      // Leer la identidad del último tour realizado
      this.db.getLastTour()
        .then(
          (result) => {
            if (result === undefined || result === null) {
              this.globals.tourNum = 0;
            } else {
              this.globals.tourNum = result.tourid;
            }
            this.logger.debug(this.ti, 'Id de tour obtenida de DB = ' + this.globals.tourNum.toString());
            this.globals.tourNum += 1;

            // Agregar registro de Tour en la base de datos
            this.db.addTour(this.globals.tourNum, 0, this.name, '', '0.0', '0.0', AppConstants.TOUR_CREATING, '')
              .then(() => {
                this.db.addTourData(this.globals.tourNum, this.name, '', '0.0', '0.0', '', '', '', '')
                  .then(() => {
                    this.globals.tourTitle = this.name;
                    resolve();
                  }, (err) => {
                    this.logger.error(this.ti, "Error al crear registro en TourData", JSON.stringify(err));
                    reject(err);
                  });
              }, (err) => {
                this.logger.error(this.ti, "Error al crear registro en Tours", JSON.stringify(err));
                reject(err);
              });
          }, (err) => {
            this.logger.error(this.ti, "Error en la base de datos", JSON.stringify(err));
            reject(err);
          });
    });
  }

  /**
   * Grabar los datos de la foto recién creada
   * 
   * @param {any} imagePath 
   * @memberof NewPanoPage
   */
  storeNewPano(imagePath: string): Promise<any> {
    this.ti = this.logt + "storeNewPano";
    this.logger.trace(this.ti, imagePath);
    this.logger.debug(this.ti, 'Save file ' + this.image + ' success!');
    this.globals.takingPhoto = false;
    let that = this;

    return new Promise((resolve, reject) => {

      this.db.addTour(that.globals.tourNum, 1, that.name, imagePath, '0.0', '0.0', AppConstants.PANO_DOWNLOADED, imagePath)
        .then(() => {
          that.logger.debug(that.ti, "Registro de nuevo pano agregado a BD");
          that.globals.newPhotos = true;
          resolve();
        }, () => {
          reject();
        });
    });

  }

}
