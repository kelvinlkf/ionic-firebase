import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { User, Chat } from "./app.model";
import { appconfig } from "./app.config";

//Authentication
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  public users: AngularFirestoreCollection<User>;
  public chats: AngularFirestoreCollection<Chat>;

  //The pair string for the two users currently chatting
  public currentChatPairId;
  public currentChatPartner;
  
  constructor(
    private db: AngularFirestore, 
    ) {
    this.chats = db.collection<Chat>(appconfig.chats_endpoint);
    this.users = db.collection<User>(appconfig.users_endpoint);
  }

  addUser(payload) {
    return this.users.add(payload);
  } //addUser

  addChat(chat: Chat) {
    return this.chats.add(chat);
  } //addChat

  createPairId(user1, user2) {
    let pairId;
    if (user1.time < user2.time) {
        console.log('user 1 is bigger');
      pairId = `${user1.email}|${user2.email}`;
    } else {
        console.log('user 2 is bigger');
      pairId = `${user2.email}|${user1.email}`;
    }

    return pairId;
  } //createPairString

}
