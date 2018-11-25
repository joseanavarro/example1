import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProfile } from "../../models/userProfile";
import { Logger } from "../../providers/logger/logger";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { Globals } from "../../providers/globals/globals";
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-user-profile-following',
  templateUrl: 'user-profile-following.html',
})
export class UserProfileFollowingPage {
  userId: number;
  public userProfile: UserProfile = new UserProfile;
  logt: string;
  ti: string;
  data: any;
  following: string[];
  errorMessage: string;
  notLoaded = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    public restApi: RestApiProvider,
    private globals: Globals,
    public ga: GoogleAnalytics
  ) {
    this.logt = "UserProfileFollowingPage | ";
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
    // Cargar perfil de usuario
    this.userId = this.globals.viewUserId;
    this.getUserProfile(this.userId);
    this.getFollowing(this.userId);
    this.ga.trackView('UserProfileFollowingPage');
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

  /**
  * Obtener el listado de tours
  *
  * @memberof BestPage
  */
  getFollowing(userId: number) {
    this.restApi.getFollow(userId, 'following').subscribe(res => {
      this.data = res;
      this.following = this.data.users;
      this.notLoaded = 0;
    }, error => (this.errorMessage = <any>error));
  }

}
