import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TourItem } from "../../models/tourItem";
import { AppConstants } from '../../providers/app-constants/app-constants';
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-report-incorrect',
  templateUrl: 'report-incorrect.html',
})
export class ReportIncorrectPage {
  public tour: TourItem;
  choiceInput: number;
  descInput: string;
  sendReportForm: FormGroup;
  inputErrorTitle: string;
  inputErrorText: string;
  closeButton: string;
  logt: string;
  loadingText: string;
  reportSentTitle: string;
  reportSentText: string;

  /**
   * Creates an instance of ReportInadequatePage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {TranslateService} translate 
   * @param {FormBuilder} formBuilder 
   * @param {UtilProvider} util 
   * @param {RestApiProvider} restApi 
   * @param {Logger} logger 
   * @memberof ReportInadequatePage
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public formBuilder: FormBuilder,
    public util: UtilProvider,
    public restApi: RestApiProvider,
    private logger: Logger,
    public loadingCtrl: LoadingController
  ) {
    this.logt = "Reportar Incorrecto | ";
    //let ti = this.logt + "constructor";
    this.tour = navParams.get("item");
    //-----------------------------------------------------
    // Definir formulario con validaciones para cada campo
    //-----------------------------------------------------
    this.sendReportForm = formBuilder.group({
      choiceInput: ["", Validators.required],
      descInput: ["", Validators.required]
    });

  }

  /**
   * 
   * 
   * @memberof ReportInadequatePage
   */
  ionViewDidLoad() {
    this.translate.get("input_error").subscribe(value => {
      this.inputErrorTitle = value;
    });
    this.translate.get("fill_cause_and_desc").subscribe(value => {
      this.inputErrorText = value;
    });
    this.translate.get("close_button").subscribe(value => {
      this.closeButton = value;
    });
    this.translate.get("wait").subscribe(value => {
      this.loadingText = value;
    });
    this.translate.get("report_sent").subscribe(value => {
      this.reportSentTitle = value;
    });
    this.translate.get("report_sent_desc").subscribe(value => {
      this.reportSentText = value;
    });
  }

  /**
 * Comprueba si un formulario es válido
 *
 * @param {FormGroup} aForm
 * @memberof LoginPage
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
  * Enviar informe de usuario a la plataforma
  *
  * @memberof LoginPage
  */
  sendReport() {
    let ti = this.logt + "sendReport()";
    this.logger.debug(ti, "Enviando report");
    //-------------------------------------------------------
    // Comprobar la validez del formulario antes de enviarlo
    //-------------------------------------------------------
    this.formValid(this.sendReportForm)
      .then(() => {
        this.logger.debug(ti, "Formulario válido");
        //-----------------------------
        // Mostrar indicador de espera
        //-----------------------------
        let loading = this.loadingCtrl.create({
          content: this.loadingText
        });
        loading.present();

        this.restApi.sendReport(
          this.tour,
          AppConstants.REPORT_INCORRECT,
          this.sendReportForm.value.choiceInput,
          this.sendReportForm.value.descInput)
          .subscribe(
            data => {
              // El informe se ha enviado, mostrar ventana informativa
              loading.dismiss();
              this.util.presentAlert(this.reportSentTitle, this.reportSentText, this.closeButton);
              this.navCtrl.pop();
            },
            err => {
              loading.dismiss();
              this.logger.error(ti, "Error: ", err);
              this.navCtrl.pop();
            }
          );
      })
      .catch(() => {
        //--------------------------------------------------------
        // Los datos introducidos en el formulario no son válidos
        //--------------------------------------------------------
        this.logger.debug(ti, "Formulario NO válido");
        this.util.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
      });
  }


}
