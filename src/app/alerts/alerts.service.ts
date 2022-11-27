import {Injectable} from '@angular/core';

import {equalTo, limitToLast, orderByChild} from "@angular/fire/database";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  totalAlerts = 0;

  constructor(private _realtimeService: RealtimeService,
              public auth: AuthenticationService) {
    this.auth.authState.subscribe(user => {
      this.observeUncountedAlerts();
      this.getTotalAlert();
    })

  }

  async checkFavoriteAlert(postUid: string, postId: string) {
    const snaphot = await this._realtimeService.get(`alerts/${postUid}/list/`, orderByChild('postId'), equalTo(postId));
    if (snaphot.exists()) {
      return Object.values(snaphot.val()).some((d: any) => d.type == 'favorite');
    } else {
      return false;
    }

  }

  createAlert(type: string, userId: string, data: any) {
    const id = this._realtimeService.createId()
    data.id = id;
    data.dateTime = new Date().getTime();
    data.uid = this.auth.user?.uid;
    data.displayName = this.auth.user?.displayName;
    data.photoURL = this.auth.user?.photoURL;
    data.counted = false;
    this._realtimeService.set(`alerts/${userId}/list/${id}`, data).then(() => id);
  }

  setTotalToZero() {
    this._realtimeService.get(`alerts/${this.auth.user?.uid}/list/`, orderByChild('counted'), equalTo(false)).then(snapshot => {
      snapshot.forEach(alert => {
        this._realtimeService.update(`alerts/${this.auth.user?.uid}/list/${alert.val().id}`, {
          counted: true
        }).then(() => {
          this._realtimeService.update(`alerts/${this.auth.user?.uid}/info/`, {
            count: 0
          }).catch();
        })
      })
    })
  }

  getAlerts() {
    return this._realtimeService.onValueChanges(`alerts/${this.auth.user?.uid}/list/`, 'id', limitToLast(30));
  }


  getTotalAlert() {
    this._realtimeService.onValueChanges(`alerts/${this.auth.user?.uid}/info/`).subscribe(t => {
      this.totalAlerts = t[0];
    })
  }


  observeUncountedAlerts() {
    this._realtimeService.onValueChanges(`alerts/${this.auth.user?.uid}/list/`, 'id', orderByChild('counted'), equalTo(false)).subscribe(alerts => {
      this._realtimeService.set(`alerts/${this.auth.user?.uid}/info/`, {
        count: alerts.length
      }).catch()
    })
  }
}
