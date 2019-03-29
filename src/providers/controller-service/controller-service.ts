import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

/*
  Generated class for the ControllerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControllerServiceProvider {

  constructor(public loading: LoadingController, public alert: AlertController) {
  }

  loaderPresent(message: string) {
    let loading = this.loading.create({
      content: message
    });
  
    loading.present();

    return loading;
  }

  loaderDismiss(loader: any)
  {
    loader.dismiss();
  }

}
