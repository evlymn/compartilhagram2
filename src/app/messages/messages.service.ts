import {Injectable} from '@angular/core';

import {Router} from "@angular/router";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {LanguageService} from "../shared/services/language/language.service";
import {limitToLast, orderByChild} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  constructor(public realtimeService: RealtimeService,
              private _router: Router,
              public auth: AuthenticationService,
              public languageService: LanguageService) {
  }

  getRooms(hostId: string) {
    return this.realtimeService.onValueChanges(`chat/rooms/${hostId}/`, 'id',
      orderByChild('dateTime'),
      limitToLast(30));
  }

  async getUserInfo(userId: string) {
    const snapshot = await this.realtimeService.get('users/' + userId);
    return snapshot.val();
  }

  async updateMessage(roomId: string, messageId: string, data: any) {
    return this.realtimeService.update(`chat/messages/${roomId}/${messageId}`, data)
  }

  getMessages(room: string) {
    return this.realtimeService.onValueChanges(`chat/messages/${room}`)
  }

  async deleteMessage(roomId: string, messageId: string) {
    console.log(`chat/messages/${roomId}/${messageId}`);
    return this.realtimeService.delete(`chat/messages/${roomId}/${messageId}`)
  }

  updateRooms(hostId: string, guestId: string) {
    this.realtimeService.update(`chat/rooms/${hostId}/${guestId}`, {
      active: true,
      dateTime: new Date().getTime()
    }).catch();
    this.realtimeService.update(`chat/rooms/${guestId}/${hostId}`, {
      active: true,
      dateTime: new Date().getTime()
    }).catch();
  }

  async createMessage(room: string, messageData: any): Promise<string> {
    return this.realtimeService.set(`chat/messages/${room}/${messageData.id}`, messageData).then(() => messageData.id as string) ;
  }

  async checkRoom(host: any, guest: any) {
    let room = '';
    const snapshot = await this.realtimeService.get(`chat/rooms/${host.uid}/${guest.uid}`);
    if (snapshot.exists()) {
      room = snapshot.val().room as string;
    } else {
      room = this.realtimeService.createId() as string;

      await this.realtimeService.set(`chat/rooms/${host.uid}/${guest.uid}/`, {
        room,
        displayName: guest.displayName,
        photoURL: guest.photoURL,
        uid: guest.uid

      }).then(() => {
        this.realtimeService.set(`chat/rooms/${guest.uid}/${host.uid}/`, {
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
