import {Injectable} from '@angular/core';

import {equalTo, orderByChild} from "@angular/fire/database";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {LanguageService} from "../shared/services/language/language.service";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(public realtimeService: RealtimeService,
              public languageService: LanguageService,
              public auth: AuthenticationService) {

  }

  createGroup(group: any) {
    const groupId = this.realtimeService.createId();
    group.id = groupId;
    group.uid = this.auth.user?.uid;
    group.dateTime = new Date().getTime();
    group.displayName = this.auth.user?.displayName;
    group.photoURL = this.auth.user?.photoURL;
    return this.realtimeService.set(`groups/list/${groupId}`, group);
  }

  getGroupMessages(groupId: string) {
    return this.realtimeService.onValueChanges('groups/messages/' + groupId, 'id');
  }

  createGroupMessage(groupId: string, data: any) {
    data.dateTime = new Date().getTime();
    return this.realtimeService.set(`groups/messages/${groupId}/${data.id}`, data);
  }

  getGroupInfo(groupId: string) {
    return this.realtimeService.get('groups/list/' + groupId);
  }

  async updateMessage(groupId: string, messageId: string, data: any) {
    return this.realtimeService.update(`groups/messages/${groupId}/${messageId}`, data)
  }


  getGroupsByUser(userId: string) {
    return this.realtimeService.onValueChanges('groups/list/', 'id', orderByChild('uid'), equalTo(userId));
  }

  getPublicGroups() {
    return this.realtimeService.onValueChanges('groups/list/', 'id', orderByChild('public'), equalTo(true));
  }

  deleteMessage(groupId: string, id: string) {

    return this.realtimeService.delete(`groups/messages/${groupId}/${id}`)

  }
}
