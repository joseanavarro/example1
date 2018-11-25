import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProfile } from "../../models/userProfile";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { Globals } from "../../providers/globals/globals";
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  userId: number;
  public userProfile: UserProfile = new UserProfile;
  logt: string;
  ti: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public restApi: RestApiProvider,
    private globals: Globals,
    public ga: GoogleAnalytics
  ) {
    this.logt = "UserProfilePage | ";
    this.ti = this.logt + "constructor";
  }

  ionViewDidLoad() {

  }

  /**
 * It’s fired when entering a page, before it becomes the active one. 
 * Use it for tasks you want to do every time you enter in the view 
 * (setting event listeners, updating a table, etc.).
 * 
 * @memberof UserProfilePage
 */
  ionViewWillEnter() {
    this.globals.viewUserId = this.navParams.get("item");
    // Cargar perfil de usuario
    this.userId = this.globals.viewUserId;
    this.getUserProfile(this.userId);
    this.ga.trackView('UserProfilePage');
  }

  /**
   * Llamar a backend para obtener perfil de usuario
   * 
   * @param {number} userId 
   * @memberof UserProfilePage
   */
  getUserProfile(userId: number) {
    this.ti = this.logt + "getUserProfile";
    this.restApi.getUserProfile(userId).subscribe(res => {
      this.userProfile = res;
      this.logger.debug(this.ti, "userProfile: ", this.userProfile.name);
    }, (err) => {
      this.logger.error(this.ti, "Error: ", err);
    });
  }

}
