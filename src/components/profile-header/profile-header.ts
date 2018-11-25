import { Component, Input } from '@angular/core';
import { UserProfile } from "../../models/userProfile";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { Globals } from "../../providers/globals/globals";
import { UtilProvider } from "../../providers/util/util";
import { Logger } from "../../providers/logger/logger";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppConstants } from "../../providers/app-constants/app-constants";

@Component({
  selector: 'profile-header',
  templateUrl: 'profile-header.html'
})
export class ProfileHeaderComponent {
  // Parámetro de entrada al componente
  @Input() user: UserProfile;

  logt: string;
  ti: string;
  public isLogged: boolean;

  constructor(
    public restApi: RestApiProvider,
    public globals: Globals,
    public util: UtilProvider,
    public logger: Logger,
    public ga: GoogleAnalytics
  ) {
    this.isLogged = this.globals.isLogged;
  }

  /**
   * Seguir al usuario
   * 
   * @memberof ProfileHeaderComponent
   */
  follow(val: boolean) {
    this.ti = this.logt + "follow";
    if (val) {
      this.ga.trackEvent(AppConstants.SC_USER, "follow", "follow");
    } else {
      this.ga.trackEvent(AppConstants.SC_USER, "follow", "unfollow");
    }
    this.restApi.follow(this.globals.viewUserId, val).subscribe(
      data => {
        this.user.is_followed = val;
      },
      err => {
        this.logger.error(this.ti, "Error: ", err);
      }
    );
  }

}
