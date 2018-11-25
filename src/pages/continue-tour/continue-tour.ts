import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from "../../providers/database-service/database-service";
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-continue-tour',
  templateUrl: 'continue-tour.html',
})
export class ContinueTourPage {

  continueTourForm: FormGroup;
  logt: string;
  ti: string;
  tourList: any[];
  viewList: boolean;
  lastPano: number;
  closeButton: string;
  inputErrorText: string;
  inputErrorTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseService,
    public formBuilder: FormBuilder,
    public globals: Globals,
    public logger: Logger,
    public util: UtilProvider,
    public translate: TranslateService
  ) {
    this.logt = "ContinueTourPage | ";
    this.ti = this.logt + "constructor";

    this.translate.get("input_error").subscribe(value => this.inputErrorTitle = value);
    this.translate.get("select_tour_to_join").subscribe(value => this.inputErrorText = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);

    //-----------------------------------------------------
    // Definir formulario con validaciones para cada campo
    //-----------------------------------------------------
    this.continueTourForm = formBuilder.group({
      tourid: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    this.viewList = false;
  }

  /**
  * It’s fired when entering a page, before it becomes the active one. 
  * Use it for tasks you want to do every time you enter in the view 
  * (setting event listeners, updating a table, etc.).
  * 
  * @memberof AddToursPage
  */
  ionViewWillEnter() {
    // Cargar la lista de tours excepto el actual
    this.loadTours();
  }

  /**
   * Obtener la lista de tours 
   * 
   * @param {any} tour_id 
   * @memberof AddToursPage
   */
  loadTours() {
    this.ti = this.logt + "loadTours";
    // Leer tabla TourData
    this.db.getAllTourData()
      .then((result) => {
        if (result.length > 0) {
          this.tourList = result;
          this.viewList = true;
        } else {
          this.viewList = false;
        }
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
   * Continuar tour virtual
   *
   * @memberof ContinueTourPage
   */
  continueTour() {
    let panosInTour = [];
    this.ti = this.logt + "joinTours";

    this.formValid(this.continueTourForm)
      .then(() => {
        let selectedTourB = this.continueTourForm.value.tourid;
        this.globals.tourNum = selectedTourB;
        this.logger.trace(this.ti, 'Error leyendo tours: ', selectedTourB);

        // Leer el título del tour y la identidad del último panorama
        this.db.getLastPanoInTour(selectedTourB)
          .then((result) => {
            this.lastPano = result.panoid;
            // Leer el título del tour
            this.db.getTourData(selectedTourB)
              .then((data) => {
                this.globals.tourTitle = data.title;
                // Saltar a la página de creación de nuevo panorama
                this.navCtrl.push("NewPanoPage", { panoId: this.lastPano + 1 });
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
