import {Injectable} from '@angular/core';
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {WindowService} from "../shared/services/window/window.service";
import {LanguageService} from "../shared/services/language/language.service";
import {Router} from "@angular/router";
import {ServiceWorkerService} from "../shared/services/service-worker/service-worker.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  set pinUpMenu(val: boolean) {
    localStorage.setItem('pinUpMenu', val.toString())
  }

  get pinUpMenu() {
    if (localStorage.getItem('pinUpMenu')) {
      return JSON.parse(localStorage.getItem('pinUpMenu')!) as boolean;
    } else {
      return false;
    }
  }

  set showUpMenu(val: boolean) {
    this.pinUpMenu = val ?   this.pinUpMenu : false ;
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
              private serviceWorker: ServiceWorkerService,
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
