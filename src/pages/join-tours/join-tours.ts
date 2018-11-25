import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourData } from "../../models/tourData";
import { DatabaseService } from "../../providers/database-service/database-service";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-join-tours',
  templateUrl: 'join-tours.html',
})
export class JoinToursPage {

  joinToursForm: FormGroup;
  logt: string;
  ti: string;
  tourId1: number;
  tourid: number;
  tourList: any[];
  tourData: TourData = new TourData();
  viewList: boolean;
  unpubTours: Object[];
  closeButton: string;
  inputErrorText: string;
  inputErrorTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private logger: Logger,
    //private globals: Globals,
    public translate: TranslateService,
    public db: DatabaseService,
    public util: UtilProvider,
    public ga: GoogleAnalytics
  ) {
    this.logt = "AddToursPage | ";
    this.ti = this.logt + "constructor";

    this.translate.get("input_error").subscribe(value => this.inputErrorTitle = value);
    this.translate.get("select_tour_to_join").subscribe(value => this.inputErrorText = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);

    //-----------------------------------------------------
    // Definir formulario con validaciones para cada campo
    //-----------------------------------------------------
    this.joinToursForm = formBuilder.group({
      tourid: ["", Validators.required]
    });

  }

  /**
    * It’s fired when entering a page, before it becomes the active one. 
    * Use it for tasks you want to do every time you enter in the view 
    * (setting event listeners, updating a table, etc.).
    * 
    * @memberof AddToursPage
    */
  ionViewWillEnter() {
    // Leer parámetros de entrada - tour seleccionado en primer lugar
    this.tourId1 = this.navParams.get("tourId");

    // Cargar datos del tour
    this.loadTourData(this.tourId1);

    // Cargar la lista de tours excepto el actual
    this.loadTours(this.tourId1);

  }

  /**
   * Obtener los datos de un tour
   * 
   * @param {any} tour_id 
   * @memberof AddToursPage
   */
  loadTourData(tour_id) {
    this.ti = this.logt + "loadTourData";
    // Leer tabla TourData
    this.db.getTourData(tour_id)
      .then((result) => {
        this.tourData.tourid = result.tourid;
        this.tourData.title = result.title;
        this.viewList = true;
      }, (err) => {
        this.logger.error(this.ti, 'Error leyendo TourData: ' + err);
      });
  }

  /**
   * Obtener la lista de tours excepto el actual
   * 
   * @param {any} tour_id 
   * @memberof AddToursPage
   */
  loadTours(tour_id) {
    this.ti = this.logt + "loadTours";
    // Leer tabla TourData
    this.db.getAllTourData(tour_id)
      .then((result) => {
        this.tourList = result;
        this.viewList = true;
      }, (err) => {
        this.logger.error(this.ti, 'Error leyendo tours: ' + err);
      });
  }

  /**
   * Comprueba si un formulario es válido
   *
   * @param {FormGroup} aForm
   * @memberof NewTourPage
   */
  formValid(aForm: FormGroup): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (aForm.valid) {
        resolve();
      } else {
        reject();
      }
    });
  }

  /**
   * Realizar la unión de tours
   * 
   * @memberof JoinToursPage
   */
  joinTours() {
    let panosInTour = [];
    this.ti = this.logt + "joinTours";

    this.formValid(this.joinToursForm)
      .then(() => {
        let selectedTourB = this.joinToursForm.value.tourid;
        this.logger.trace(this.ti, 'Error leyendo tours: ', selectedTourB);

        // Primero borrar registro en TourData del segundo tour
        this.db.removeTourData(selectedTourB)
          .then((result) => {
            // A continuación cambiar los registros en la tabla Tours
            // Leer tabla de Tours
            this.db.getPanos(selectedTourB)
              .then((result) => {
                panosInTour = result;
                if (panosInTour.length > 0) {
                  this.db.getLastPanoInTour(this.tourId1)
                    .then((resultNewPanoId) => {
                      let newPanoId = resultNewPanoId.panoid;
                      /* jshint loopfunc:true */
                      for (var i = 0; i < result.length; i++) {
                        this.logger.info(this.ti, 'pano name = ', panosInTour['item'](i).name);
                        this.logger.info(this.ti, 'pano status = ', panosInTour['item'](i).status);
                        if (panosInTour['item'](i).panoid === 0) {
                          // Borrar registro con nombre del tour
                          this.db.removeTourItem(selectedTourB, 0);
                        } else {
                          // Actualizar registro del pano
                          newPanoId = newPanoId + 1;
                          this.db.UpdatePanoInTour(selectedTourB,
                            panosInTour['item'](i).panoid, this.tourId1, newPanoId);
                        }
                      }
                      this.navCtrl.setRoot("MyPhotosPage");
                    });
                } else {
                  // No hay panoramas en el tour
                  this.viewList = false;
                }
              },
                function (err) {
                  this.logger.trace(this.ti, 'Error leyendo panos: ', err);
                });
          },
            function (err) {
              this.logger.trace(this.ti, 'Error leyendo tours: ', err);
            });
      },
        (err) => {
          this.logger.debug(this.ti, "Formulario NO válido");
          this.util.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
        });
  }

}
