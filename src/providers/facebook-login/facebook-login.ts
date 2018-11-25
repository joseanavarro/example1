import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Facebook } from "@ionic-native/facebook";
import { NativeStorage } from "@ionic-native/native-storage";
import "rxjs/add/operator/toPromise";
import { AppConstants } from "../../providers/app-constants/app-constants";
import { Logger } from "../logger/logger";
import { LoginService } from "../login-service/login-service";

@Injectable()
export class FacebookLoginService {
  FB_APP_ID: number = AppConstants.FACEBOOK_APP_ID;
  logt: string;
  email: string;
  fbtoken: string;

  constructor(
    public http: Http,
    public nativeStorage: NativeStorage,
    public fb: Facebook,
    public logger: Logger,
    public loginServ: LoginService
  ) {
    this.logt = "FacebookLoginService | ";
    let ti = this.logt + "constructor";
    this.logger.info(ti, "FacebookLoginService creado");

    //this.fb.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFacebookLogin() {
    let ti = this.logt + "doFacebookLogin";
    return new Promise<any>((resolve, reject) => {
      //["public_profile"] is the array of permissions, you can add more if you need
      this.fb.login(["email", "public_profile"]).then(
        response => {
          this.fbtoken = response.authResponse.accessToken;
          this.logger.trace(ti, "Facebook token", this.fbtoken);
          //Getting name and email properties
          this.fb.api("/me?fields=name,email,gender", []).then(user => {
            this.email = user.email;
            this.logger.trace(ti, "Información de usuario de FB: ", user);
            //------------------------------------------------
            // Ejecutar el login dentro de nuestra plataforma
            //------------------------------------------------
            this.loginServ
              .doLogin(AppConstants.FACEBOOK_LOGIN, this.email, this.fbtoken)
              .then(
                data => {
                  this.logger.debug(ti, "Usuario logueado", "");
                  resolve();
                },
                err => {
                  this.logger.debug(ti, "Error: ", err);
                  reject(err);
                }
              );
          });
        },
        err => {
          this.logger.error(ti, "Error tomando el perfil público de Facebook", err);
          reject(err);
        }
      );
    });
  }

  doFacebookLogout() {
    return new Promise((resolve, reject) => {
      this.fb.logout().then(
        res => {
          //user logged out so we will remove him from the NativeStorage
          this.nativeStorage.remove("facebook_user");
          resolve();
        },
        err => {
          reject();
        }
      );
    });
  }

  getFacebookUser() {
    return this.nativeStorage.getItem("facebook_user");
  }

  setFacebookUser(user: any) {
    // let ti = this.logt + "setFacebookUser";
    // return new Promise<FacebookUserModel>((resolve, reject) => {
    //   //this.getFriendsFakeData().then(data => {
    //   this.logger.trace(ti, "Perfil de usuario", user);
    //   resolve(
    //     this.nativeStorage.setItem("facebook_user", {
    //       userId: user.id,
    //       name: user.name,
    //       gender: null,
    //       email: user.email,
    //       image:
    //         "https://graph.facebook.com/" + user.id + "/picture?type=large",
    //       friends: null, //data.friends,
    //       photos: null //data.photos
    //     })
    //   );
    //   //});
    // });
  }

  // getFriendsFakeData(): Promise<FacebookUserModel> {
  //   return this.http
  //     .get("./assets/example_data/social_integrations.json")
  //     .toPromise()
  //     .then(response => response.json() as FacebookUserModel)
  //     .catch(this.handleError);
  // }

  // private handleError(error: any): Promise<any> {
  //   console.error("An error occurred", error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
