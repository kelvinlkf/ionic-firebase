import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { User_Info, User, Chat } from "./app.model";
import { appconfig } from "./app.config";

//Authentication
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ToastController, LoadingController, AlertController } from "ionic-angular";

@Injectable()
export class AuthService {

  public users: AngularFirestoreCollection<User_Info>;

  constructor(
    private db: AngularFirestore,
    public auth: AngularFireAuth,
    public toast: ToastController,
    public load: LoadingController,
    public alert: AlertController,
  ) {
    this.users = db.collection<User_Info>(appconfig.users_info_endpoint);
  }

  doRegister(value) {
    let loader = this.loadPresent('Registering...');

    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.loadDismiss(loader);
          resolve(res);
        }, err => {
          this.loadDismiss(loader);
          this.toastPresent('top', err.message, 2500, null);
          // reject(err)
        })
    })
  }

  doLogin(value) {
    let loader = this.loadPresent('Loggin In...');

    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.loadDismiss(loader);
          resolve(res);
        }, err => {
          this.loadDismiss(loader);
          this.toastPresent('top', err.message, 2500, null);
          // reject(err)
        })
    })
  }

  doSignOut() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  doGetUser() {
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      return user;
    } else {
      // No user is signed in.
    }
  }

  doAddCredential(payload) {
    let load = this.loadPresent('Adding Information, Please Wait...');
    this.users.add(payload).then(res => {
      this.toastPresent('top', 'Information Added Successfully', 1500, load);
    }, (err) => {
      this.toastPresent('top', err.message, 1500, load);
    });
  } //addUser

  doGetCredential(email) {
    return new Promise((resolve, reject) => {
      this.db
        .collection<User_Info>(appconfig.users_info_endpoint, ref => {
          return ref.where("email", "==", email);
        })
        .valueChanges()
        .subscribe(users => {
          if (users.length > 0) {
            resolve(users[0]);
          }
          else {
            resolve(null);
          }
        }, (err) => {
          console.log(err);
        })
    })
  }

  doUpdateCredential(form: any) {
    console.log('calling update');
    var db = firebase.firestore();
    let load = this.loadPresent('Updating Information, Please Wait...');

    db.collection("user_info").where("email", "==", form.email)
      .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
          // console.log(doc.id, " => ", doc.data());
          db.collection("user_info").doc(doc.id).update(form);
        });
      }, (err) => {
        this.toastPresent('top', err.message, 2500, null);
        console.log(err);
      })
    this.toastPresent('top', 'Info Updated Successfully', 1500, load);
  }

  //Generic
  toastPresent(position: string, message: string, time: number, loader: any) {
    if (loader != null) {
      this.loadDismiss(loader);
    }

    let toast = this.toast.create({
      message: message,
      duration: time,
      position: position
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

  loadPresent(message: string) {
    let loading = this.load.create({
      content: message
    });

    loading.present();

    return loading;
  }

  loadDismiss(load: any) {
    load.dismiss();
  }
}