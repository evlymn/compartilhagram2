import {Injectable} from '@angular/core';

import {Router} from "@angular/router";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {LanguageService} from "../shared/services/language/language.service";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  constructor(private _realtime: RealtimeService,
              private _router: Router,
              public auth: AuthenticationService,
              public languageService: LanguageService) {
  }

  async getRooms(hostId: string) {
    return await this._realtime.get(`chat/rooms/${hostId}/`);
  }

  async getUserInfo(userId: string) {
    const snapshot = await this._realtime.get('users/' + userId);
    return snapshot.val();
  }

  getMessages(room: string) {
    return this._realtime.onValueChanges(`chat/messages/${room}`)
  }

  async createMessage(room: string, messageData: any) {

    return this._realtime.add(`chat/messages/${room}`, messageData);
  }

  async checkRoom(host: any, guest: any) {
    let room = '';
    const snapshot = await this._realtime.get(`chat/rooms/${host.uid}/${guest.uid}`);
    if (snapshot.exists()) {
      room = Object.keys(snapshot.val())[0];
    } else {
      room = this._realtime.createId() as string;

      await this._realtime.set(`chat/rooms/${host.uid}/${guest.uid}/${room}`, {
        room,
        displayName: guest.displayName,
        photoURL: guest.photoURL,
        uid: guest.uid

      }).then(() => {
        this._realtime.set(`chat/rooms/${guest.uid}/${host.uid}/${room}`, {
          room,
          displayName: host.displayName,
          photoURL: host.photoURL,
          uid: host.uid
        })
      });
    }
    return room;
  }

}
