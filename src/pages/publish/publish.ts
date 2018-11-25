import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {
  logt: string;
  ti: string;
  imageSrc: string;
  metaData: any;
  picture: any;
  showPicture: boolean;
  loading: any;

  /**
   * Creates an instance of PublishPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {Camera} camera 
   * @param {Platform} platform 
   * @memberof PublishPage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public platform: Platform,
    public ga: GoogleAnalytics,
    public logger: Logger,
    public util: UtilProvider,
    public file: File,
    public loadingCtrl: LoadingController,
    public photoLibrary: PhotoLibrary
  ) {
    this.logt = "PublishPage | ";
    this.loading = this.loadingCtrl.create();
  }

  /**
   * 
   * 
   * @memberof PublishPage
   */
  ionViewDidLoad() {
    this.ti = this.logt + "ionViewDidLoad";
    this.logger.debug(this.ti, "ionViewDidLoad ");
    this.showPicture = false;
  }

  /**
   * Seleccionar un panorama desde la galería para publicarlo
   * 
   * @memberof PublishPage
   */
  selectPanorama() {

    this.ti = "selectPanorama";

    this.logger.debug(this.ti, "Entrar en procedimiento ");
    this.loading.present();

    const options0: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options0).then((imageData) => {
      try {
        this.loading.dismiss();
        // En imageData obtenemos el path de la foto seleccionada
        this.logger.debug(this.ti, "imageData: ", imageData);
        this.picture = imageData;
        this.navCtrl.push("Publish2Page", { image: this.picture });

      } catch (e) {
        this.loading.dismiss();
        this.logger.error(this.ti, "Error: ", e.toString());
      }
    }, (err) => {
      // Handle error
      this.loading.dismiss();
      this.logger.error(this.ti, "Error en camera.getPicture: "), err;
    });

  }

}
