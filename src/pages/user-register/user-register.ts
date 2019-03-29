import { Component, OnInit } from "@angular/core";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { ChatService } from "../../app/app.service-chat";
import { AuthService } from "../../app/app.service-auth";

/**
 * Generated class for the UserRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {

  //email: string;
  loginForm: any = {};
  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    private chatservice: ChatService,
    private authservice: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  loginUser() {
    this.authservice.doRegister(this.loginForm).then(res => {
      console.log(res);
    })
  }

}
