import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pre-upload-pano',
  templateUrl: 'pre-upload-pano.html',
})
export class PreUploadPanoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreUploadPanoPage');
  }

}
