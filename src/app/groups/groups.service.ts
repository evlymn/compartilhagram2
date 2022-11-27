import {Injectable} from '@angular/core';

import {equalTo, orderByChild} from "@angular/fire/database";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private _realtime: RealtimeService,
              public auth: AuthenticationService) {
  }

  createGroup(group: any) {
    const groupId = this._realtime.createId();
    group.id = groupId;
    group.uid = this.auth.user?.uid;
    group.dateTime = new Date().getTime();
    group.displayName = this.auth.user?.displayName;
    group.photoURL = this.auth.user?.photoURL;
    return this._realtime.set(`groups/list/${groupId}`, group);
  }

  getGroupMessages(groupId: string) {
    return this._realtime.onValueChanges('groups/messages/' + groupId, 'id');
  }

  createGroupMessage(groupId: string, data: any) {
    data.dateTime = new Date().getTime();
    return this._realtime.add(`groups/messages/${groupId}`, data);
  }

  getGroupInfo(groupId: string) {
    return this._realtime.get('groups/list/' + groupId);
  }


  getGroupsByUser(userId: string) {
    return this._realtime.onValueChanges('groups/list/', 'id', orderByChild('uid'), equalTo(userId));
  }

  getPublicGroups() {
    return this._realtime.onValueChanges('groups/list/', 'id', orderByChild('public'), equalTo(true));
  }
}
