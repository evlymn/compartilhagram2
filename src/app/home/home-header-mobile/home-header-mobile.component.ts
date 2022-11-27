import {Component} from '@angular/core';
import {NotificationService} from "../../shared/services/notification/notification.service";
import {HomeService} from "../home.service";

@Component({
  selector: 'app-home-header-mobile',
  templateUrl: './home-header-mobile.component.html',
  styleUrls: ['./home-header-mobile.component.scss']
})
export class HomeHeaderMobileComponent {
  constructor(private _notificationService: NotificationService,
              public homeService: HomeService) {
  }

  toggleSideNav() {
    this._notificationService.next('toggleSideNav', null);
  }


  toggleSearchUser() {
    this._notificationService.next('toggleSearchPanel', null);
  }

  logout() {
    this.homeService.auth.signOut()
  }
}
