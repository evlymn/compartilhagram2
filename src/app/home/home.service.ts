import {Injectable} from '@angular/core';
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {NotificationService} from "../shared/services/notification/notification.service";
import {Router} from "@angular/router";
import {WindowService} from "../shared/services/window/window.service";
import {LanguageService} from "../shared/services/language/language.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public authService: AuthenticationService,
              public auth: AuthenticationService,
              public windowService: WindowService,
              public languageService: LanguageService
  ) {

  }


}
