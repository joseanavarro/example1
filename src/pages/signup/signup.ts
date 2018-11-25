import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from "ionic-angular";
import { Logger } from "../../providers/logger/logger";
import { LoginService } from "../../providers/login-service/login-service";
import { WelcomePage } from "../welcome/welcome";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  providers: [LoginService]
})
export class SignupPage {
  registerForm: FormGroup;
  logt: string;
  loadingText: string;
  inputErrorTitle: string;
  inputErrorText: string;
  closeButton: string;
  samePasswordError: string;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public loading: LoadingController,
    public translate: TranslateService,
    public logger: Logger,
    private alertCtrl: AlertController,
    public loginServ: LoginService
  ) {
    this.logt = "Página Registro | ";
    let ti = this.logt + "constructor";
    this.logger.info(ti, "Página registro creada");
    //-----------------------------------------------------
    // Definir formulario con validaciones para cada campo
    //-----------------------------------------------------
    this.registerForm = formBuilder.group({
      nameInput: ["", [Validators.required]],
      surnameInput: ["", []],
      emailInput: ["", [Validators.required, Validators.email]],
      passwordInput: ["", Validators.required],
      repPasswordInput: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    let ti = this.logt + "ionViewDidLoad";
    this.logger.debug(ti, "ionViewDidLoad ejecutado");
    this.translate.get("login_wait").subscribe(value => {
      this.loadingText = value;
    });
    this.translate.get("input_error").subscribe(value => {
      this.inputErrorTitle = value;
    });
    this.translate.get("input_error_desc").subscribe(value => {
      this.inputErrorText = value;
    });
    this.translate.get("enter_same_password").subscribe(value => {
      this.samePasswordError = value;
    });
    this.translate.get("close_button").subscribe(value => {
      this.closeButton = value;
    });
  }

  /**
   * Volver atrás
   *
   * @memberof LoginPage
   */
  goBack() {
    this.navCtrl.pop();
  }

  /**
   * Realizar proceso de registro
   *
   * @memberof SignupPage
   */
  doRegister() {
    let ti = this.logt + "doRegister()";
    this.logger.debug(ti, "Botón de registro{} pulsado");

    this.formValid(this.registerForm)
      .then(() => {
        //-----------------------------------------------
        // Iniciar procedimiento de registro de usuario
        //-----------------------------------------------
        if (
          this.registerForm.value.passwordInput !==
          this.registerForm.value.repPasswordInput
        ) {
          this.logger.debug(ti, "Las contraseñas no coinciden");
          this.presentAlert(
            this.inputErrorTitle,
            this.samePasswordError,
            this.closeButton
          );
        } else {
          //-------------------------------
          // Enviar formulario de registro
          //-------------------------------
          //-----------------------------
          // Mostrar indicador de espera
          //-----------------------------
          let loading = this.loading.create({
            content: this.loadingText
          });
          loading.present();
          this.loginServ
            .doSignup(
              this.registerForm.value.nameInput,
              this.registerForm.value.surnameInput,
              this.registerForm.value.emailInput,
              this.registerForm.value.passwordInput
            )
            .then(
              data => {
                this.logger.debug(ti, "Usuario registrado", "");
                loading.dismiss();
                this.navCtrl.push(WelcomePage);
              },
              err => {
                this.logger.debug(ti, "Error: ", err);
                loading.dismiss();
              }
            );
        }
      })
      .catch(() => {
        //--------------------------------------------------------
        // Los datos introducidos en el formulario no son válidos
        //--------------------------------------------------------
        this.logger.debug(ti, "Formulario NO válido");
        this.presentAlert(
          this.inputErrorTitle,
          this.inputErrorText,
          this.closeButton
        );
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
   * Mostrar mensaje emergente
   *
   * @param {string} title
   * @param {string} text
   * @param {string} bText
   * @memberof LoginPage
   */
  presentAlert(title: string, text: string, bText: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [bText]
    });
    alert.present();
  }
}
