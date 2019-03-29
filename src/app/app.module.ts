import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { appconfig } from "./app.config";
import { PipesModule } from '../pipes/pipes.module';
import { ChatsPage } from '../pages/chats/chats';

//Authentication
import { AngularFireAuth } from 'angularfire2/auth';

//Facebook & Google
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

//Service
import { ChatService } from './app.service-chat';
import { AuthService } from './app.service-auth';

//Providers
import { ControllerServiceProvider } from '../providers/controller-service/controller-service';

//Pages
import { UserRegisterPage } from '../pages/user-register/user-register';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserHomePage } from '../pages/user-home/user-home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChatsPage,
    UserHomePage,
    UserRegisterPage,
    UserProfilePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(appconfig.firebase),
    AngularFirestoreModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChatsPage,
    UserHomePage,
    UserRegisterPage,
    UserProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    AuthService,
    AngularFireAuth,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ControllerServiceProvider
  ]
})
export class AppModule {}
