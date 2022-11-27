import {Injectable} from '@angular/core';

import {limitToLast} from "@angular/fire/database";
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

  getPostByUser(userId: string) {
    return this._realtime.get('timeline/messages-by-user/' + userId);
  }

  async getPhotosByUser(userId: string) {
    return this._realtime.get(`timeline/albums/photos/by-user/${userId}`);
  }

  async getRepostsByUser(userId: string) {
    return this._realtime.get(`timeline/repost-by-user/${userId}`);
  }

  followUser(followId: string) {
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
      })
    })
    this._realtime.set(`timeline/follow/followers/${followId}/${this.auth.user?.uid}`, {
      uid: this.auth.user?.uid
    }).catch();
  }

  unfollowUser(followId: string) {
    this._realtime.delete(`timeline/follow/following/${this.auth.user?.uid}/${followId}`).catch();
    this._realtime.delete(`timeline/follow/followers/${followId}/${this.auth.user?.uid}`).catch();
  }
}

