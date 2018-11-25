import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  public loading = null;

  constructor(
    private loadingCtrl: LoadingController
  ) {
  }

  presentLoader(text: string, time: number = 0) {
    // this below will prevent "stacking" as long as we treat this.loading as a single source of truth for any loader:
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
    if (text != '') {
      this.loading = this.loadingCtrl.create({
        content: text
      });
      let timeout = time === 0 ? 5000 : time * 1000;
      this.loading.present();
      setTimeout(() => {
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
      }, timeout);
    }

  }

}
