import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConstants } from '../../providers/app-constants/app-constants';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  appVersion: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iab: InAppBrowser) {
    this.appVersion = AppConstants.APP_VERS;
  }

  openExtern(url: string) {
    this.iab.create(url, '_blank', 'location=no,footer=yes,footercolor=#199ACD');
  }
}
