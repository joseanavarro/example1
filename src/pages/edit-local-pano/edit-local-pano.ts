import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { File } from '@ionic-native/file';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanoItem } from "../../models/panoItem";
import { DatabaseService } from "../../providers/database-service/database-service";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-edit-local-pano',
  templateUrl: 'edit-local-pano.html',
})
export class EditLocalPanoPage {

  panoid: number;
  tourid: number;
  logt: string;
  ti: string;
  pano: PanoItem = new PanoItem();
  closeButton: string;
  updated_data: string;
  updated_data_desc: string;
  confirmMessage: string;
  confirmTitle: string;
  txtAcceptButton: string;
  txtCancelButton: string;

  constructor(
    private logger: Logger,
    public navCtrl: NavController,
    public translate: TranslateService,
    public dialogs: Dialogs,
    public db: DatabaseService,
    public util: UtilProvider,
    public navParams: NavParams,
    public file: File
  ) {
    this.logt = "EditLocalPanoPage | ";
    this.ti = this.logt + "constructor";

    this.panoid = this.navParams.get("pano_id");
    this.tourid = this.navParams.get("tour_id");

    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("updated_data").subscribe(value => this.updated_data = value);
    this.translate.get("updated_data_desc").subscribe(value => this.updated_data_desc = value);
    this.translate.get("delete_scene").subscribe(value => this.confirmTitle = value);
    this.translate.get("delete_scene_confirm").subscribe(value => this.confirmMessage = value);
    this.translate.get("cancel").subscribe(value => this.txtCancelButton = value);
    this.translate.get("accept").subscribe(value => this.txtAcceptButton = value);

    // Cargar datos del panorama
    this.loadPanoData(this.tourid, this.panoid);
  }

  /**
     * Obtener los datos de un tour
     * 
     * @param {any} tour_id 
     * @memberof AddToursPage
     */
  loadPanoData(tour_id, pano_id) {
    this.ti = this.logt + "loadTourData";
    // Leer tabla TourData
    this.db.getPanoData(tour_id, pano_id)
      .then((result) => {
        this.pano = result;
        this.logger.debug(this.ti, 'Pano leido: ', this.pano.name);
      }, (err) => {
        this.logger.error(this.ti, 'Error leyendo panorama: ' + err);
      });
  }

  /**
   * Editar el título del panorama
   * 
   * @memberof EditLocalPanoPage
   */
  editPano() {
    this.ti = this.logt + "editPano";

    this.db.editPanoName(this.panoid, this.tourid, this.pano.name)
      .then(() => {
        this.util.presentAlert(this.updated_data, this.updated_data_desc, this.closeButton);
      }, (err) => {
        this.logger.error(this.ti, 'Error editando panorama: ' + err);
      });
  }

  /**
  * Borrar el panorama
  * 
  * @memberof EditLocalPanoPage
  */
  deletePano() {
    this.ti = this.logt + "deletePano";
    let ctx = this;
    let buttons = [this.txtAcceptButton, this.txtCancelButton];
    ctx.dialogs.confirm(ctx.confirmMessage, ctx.confirmTitle, buttons)
      .then((result) => {
        // result = 1 -> ok
        // result = 2 -> cancel
        ctx.logger.debug(ctx.ti, 'Opción seleccionada: ', result.toString());
        if (result === 1) {
          ctx.db.removeTourItem(ctx.tourid, ctx.panoid)
            .then(() => {
              // Borrar el archivo del panorama
              let pathToDelete0 = ctx.pano.pano;
              let fileToDelete = pathToDelete0.split('\\').pop().split('/').pop();
              ctx.logger.info(ctx.ti, 'Borrar archivo = ' + pathToDelete0);
              pathToDelete0 = pathToDelete0.replace(fileToDelete, '');
              ctx.file.removeFile(pathToDelete0, fileToDelete)
                .then(() => {
                  ctx.logger.debug(ctx.ti, "Fichero borrado: " + pathToDelete0 + "/" + fileToDelete);
                  ctx.util.presentAlert(ctx.updated_data, ctx.updated_data_desc, ctx.closeButton);
                  ctx.navCtrl.pop();
                })
                .catch((err) => {
                  ctx.logger.error(ctx.ti, "Error borrando fichero: " + pathToDelete0 + "/" + fileToDelete, err);
                });
            }, (err) => {
              ctx.logger.error(ctx.ti, 'Error borrando panorama: ' + err);
            });
        } else {
          ctx.logger.debug(ctx.ti, 'Se decide no borrar el pano');
        }
      });
  }

}
