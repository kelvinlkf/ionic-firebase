import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { UserRegisterPage } from "../user-register/user-register";
import { AuthService } from "../../app/app.service-auth";
import { UserProfilePage } from "../user-profile/user-profile";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  //email: string;
  loginForm: any = {email: 'kelvin.lkf@hotmail.com', password: 'k3lvinwind'};
  constructor(
    public navCtrl: NavController,
    private authservice: AuthService,
    public loading: LoadingController,
    public fb: Facebook,
    public google: GooglePlus
  ) {}

  ngOnInit() {
    // this.storage.get("chatuser").then(chatuser => {
    //   if (chatuser && chatuser.email !== "") {
    //     this.navCtrl.push(ChatsPage);
    //   }
    // });
  }

  loginUser() {
    this.authservice.doLogin(this.loginForm).then(res => {
      let user = this.authservice.doGetUser();
      this.navCtrl.push(UserProfilePage, {init: true});
    });
  }

  register()
  {
    this.navCtrl.push(UserRegisterPage);
  }

  fbLogin()
  {
    let permissions = new Array<string>();

    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];

    this.fb.login(permissions)
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
  }

  googleLogin()
  {
    this.google.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}