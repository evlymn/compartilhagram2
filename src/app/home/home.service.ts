import {Injectable} from '@angular/core';
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {WindowService} from "../shared/services/window/window.service";
import {LanguageService} from "../shared/services/language/language.service";
import {AppUpdateService} from "../shared/services/app/app-update.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  set showUpMenu(val: boolean) {
    localStorage.setItem('showUpMenu', val.toString())
  }

  get showUpMenu() {
    if (localStorage.getItem('showUpMenu')) {
      return JSON.parse(localStorage.getItem('showUpMenu')!) as boolean;
    } else {
      return true;
    }
  }

  set sideNavOpened(val) {
    localStorage.setItem('sideNavOpened', val.toString());
  }

  get sideNavOpened() {
    if (localStorage.getItem('sideNavOpened')) {
      return JSON.parse(localStorage.getItem('sideNavOpened')!) as boolean;
    } else {
      return true;
    }
  }

  constructor(public authService: AuthenticationService,
              public auth: AuthenticationService,
              public windowService: WindowService,
              public languageService: LanguageService,
              private appUpdateService: AppUpdateService,
              private _router: Router
  ) {

  }

  checkRoute(route: string) {
    const routeArr = this._router.url.split('/');
    return this._router.url.split('/')[routeArr.length - 1] == route;
  }

  toggleSideNav() {
    this.sideNavOpened = !this.sideNavOpened;
  }

}
