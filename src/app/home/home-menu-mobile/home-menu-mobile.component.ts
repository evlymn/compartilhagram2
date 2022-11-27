import {Component} from '@angular/core';
import {HomeService} from "../home.service";
import {AlertsService} from "../../alerts/alerts.service";

@Component({
  selector: 'app-home-menu-mobile',
  templateUrl: './home-menu-mobile.component.html',
  styleUrls: ['./home-menu-mobile.component.scss']
})
export class HomeMenuMobileComponent {
  user: any;

  constructor(public homeService: HomeService,   public alertsService: AlertsService) {
    this.homeService.authService.authState.subscribe(user => {
      this.user = user;
    })
  }
}
