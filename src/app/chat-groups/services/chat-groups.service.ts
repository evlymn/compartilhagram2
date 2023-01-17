import {Injectable} from '@angular/core';
import {GroupsService} from "./groups.service";
import {ChatService} from "./chat.service";
import {AuthenticationService} from "../../shared/services/firebase/authentication/authentication.service";
import {LanguageService} from "../../shared/services/language/language.service";

@Injectable({
  providedIn: 'root'
})
export class ChatGroupsService {

  constructor(
    public groupsService: GroupsService,
    public chatService: ChatService,
    public auth: AuthenticationService,
    public languageService: LanguageService,) {
  }
}
