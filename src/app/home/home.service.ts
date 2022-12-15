import {Injectable} from '@angular/core';
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {WindowService} from "../shared/services/window/window.service";
import {LanguageService} from "../shared/services/language/language.service";
import {AppUpdateService} from "../shared/services/app/app-update.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public authService: AuthenticationService,
              public auth: AuthenticationService,
              public windowService: WindowService,
              public languageService: LanguageService,
              private appUpdateService: AppUpdateService
  ) {
  }
}
