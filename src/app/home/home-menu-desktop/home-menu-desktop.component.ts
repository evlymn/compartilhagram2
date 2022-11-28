import {Component} from '@angular/core';
import {HomeService} from "../home.service";
import {AlertsService} from "../../alerts/alerts.service";

@Component({
  selector: 'app-home-menu-desktop',
  templateUrl: './home-menu-desktop.component.html',
  styleUrls: ['./home-menu-desktop.component.scss']
})
export class HomeMenuDesktopComponent {

  isDesktop = this.homeService.windowService.sizes.isDesktop;
  isMiddleSize = this.homeService.windowService.sizes.isMiddleSize;

  constructor(public homeService: HomeService, public alertsService: AlertsService) {
    this.homeService.windowService.getSizes.subscribe(s => {
      this.isDesktop = s.isDesktop;
      this.isMiddleSize = s.isMiddleSize;
    })
  }
}
