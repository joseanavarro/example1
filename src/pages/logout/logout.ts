import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginService } from "../../providers/login-service/login-service";
import { WelcomePage } from "../../pages/welcome/welcome";

@IonicPage()
@Component({
  selector: "page-logout",
  templateUrl: "logout.html",
  providers: [LoginService]
})
export class LogoutPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginServ: LoginService
  ) { }

  /**
   * 
   * 
   * @memberof LogoutPage
   */
  ionViewDidLoad() {
    // Ejecutar logout del usuario
    this.loginServ.doLogout().then(() => {
      this.navCtrl.setRoot(WelcomePage);
    });
  }

}
