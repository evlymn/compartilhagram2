import {Component} from '@angular/core';
import {HomeService} from "../home.service";
import {AlertsService} from "../../alerts/alerts.service";
import {LanguageService} from "../../shared/services/language/language.service";

@Component({
  selector: 'app-home-menu-desktop',
  templateUrl: './home-menu-desktop.component.html',
  styleUrls: ['./home-menu-desktop.component.scss']
})
export class HomeMenuDesktopComponent {

  user: any
  isExchangeagram =false
  isSmaller900 = this.homeService.windowService.sizes.width < 900;
  isDesktop = this.homeService.windowService.sizes.isDesktop;
  isMiddleSize = this.homeService.windowService.sizes.isMiddleSize;

  constructor(

    public languageService: LanguageService,
    public homeService: HomeService,
    public alertsService: AlertsService) {
    this.isExchangeagram = window.location.host == 'exchangeagram.app';
    this.homeService.windowService.getSizes.subscribe(s => {
      this.isDesktop = s.isDesktop;
      this.isMiddleSize = this.homeService.windowService.sizes.width < 650;
      this.isSmaller900 = this.homeService.windowService.sizes.width < 900;
    })
    this.homeService.auth.authState.subscribe(user => {
      this.user = user;
    })
  }

  logOut() {
    this.homeService.auth.signOut();
  }
}
