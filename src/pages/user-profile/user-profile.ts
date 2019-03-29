import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../app/app.service-auth";
import { UserHomePage } from '../user-home/user-home';
import { ControllerServiceProvider } from '../../providers/controller-service/controller-service';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  loader: any;
  found: boolean;

  form: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public con: ControllerServiceProvider) {
    
    this.loader = this.con.loaderPresent('Getting Information');

    this.found = false;

    if(this.navParams.get('init') == true)
    {
      this.initLaunch();
    }
    else
    {
      this.get();
    }
  }

  initLaunch()
  {
    let user = this.auth.doGetUser();
    this.auth.doGetCredential(user.email).then(res => {
      this.con.loaderDismiss(this.loader);
      this.found = res == null ? false : true;
      this.found == true ? this.navCtrl.setRoot(UserHomePage, {}, { animate: true, direction: 'forward' }) : null ;
    })
  }

  get()
  {
    let user = this.auth.doGetUser();
    this.auth.doGetCredential(user.email).then(res => {
      this.con.loaderDismiss(this.loader);
      this.found = res == null ? false : true;
    })
  }

  update()
  {
    this.form.email = this.auth.doGetUser().email;
    this.found == true ? this.auth.doUpdateCredential(this.form) : this.auth.doAddCredential(this.form);
    this.navCtrl.setRoot(UserHomePage, {}, { animate: true, direction: 'forward' })
  }
}
