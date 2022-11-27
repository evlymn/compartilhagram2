import {Injectable} from '@angular/core';

import {equalTo, limitToLast, orderByChild,} from "@angular/fire/database";
import {AlertsService} from "../alerts/alerts.service";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _realtime: RealtimeService,
              public auth: AuthenticationService,
              private _alertsService: AlertsService) {
  }

  getProfile(userId: string) {
    return this._realtime.get('users/' + userId);
  }

  async getIsFollowed(followId: string) {
    const snapshot = await this._realtime.get(`timeline/follow/following/${this.auth.user?.uid}/${followId}`);
    return snapshot.exists();
  }

  getPostByUser(userId: string) {
    return this._realtime.get('timeline/messages-by-user/' + userId);
  }

  async getPhotosByUser(userId: string) {
    return this._realtime.get(`timeline/albums/photos/by-user/${userId}`);
  }

  async getRepostsByUser(userId: string) {
    return this._realtime.get(`timeline/repost-by-user/${userId}`);
  }

  async followUser(followId: string) {
    return this._realtime.set(`timeline/follow/followers/${followId}/${this.auth.user?.uid}`, {
      uid: this.auth.user?.uid
    }).then(() => {
      this._realtime.set(`timeline/follow/following/${this.auth.user?.uid}/${followId}`, {
        uid: followId
      }).then(() => {
        this._alertsService.createAlert('follow', followId, {
          followerId: this.auth.user?.uid,
          followingId: followId,
          type: 'follow',
          alertText: 'Seguiu você',
          icon: 'person'
        });
        this._realtime.get('timeline/messages-by-user/' + followId, limitToLast(10)).then(messages => {
          messages.forEach(m => {
            this._realtime.set(`timeline/follow/messages/${this.auth.user?.uid}/${m.val().id}`, m.val()).catch();
          })
          return true;
        })
      })
    })
  }

  async unfollowUser(followId: string) {
    return this._realtime.delete(`timeline/follow/following/${this.auth.user?.uid}/${followId}`).then(() => {
      this._realtime.delete(`timeline/follow/followers/${followId}/${this.auth.user?.uid}`).then(() => {
        const messagesPath = `timeline/follow/messages/${this.auth.user?.uid}/`
         this._realtime.get(messagesPath, orderByChild('uid'), equalTo(followId)).then(snapshot => {
          snapshot.forEach(data => {
            this._realtime.delete(messagesPath + data.key).catch()
          })
          return true;
        })
      });
    });
  }
}

