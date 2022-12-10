import {Component} from '@angular/core';
import {NotificationService} from "../../shared/services/notification/notification.service";
import {HomeService} from "../home.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-header-mobile',
  templateUrl: './home-header-mobile.component.html',
  styleUrls: ['./home-header-mobile.component.scss']
})
export class HomeHeaderMobileComponent {
  tabSelectedIndex = 0;
  searchText = '';

  constructor(private _notificationService: NotificationService,
              public homeService: HomeService,
              private router: Router) {
  }

  toggleSideNav() {
    this._notificationService.next('toggleSideNav', null).catch();
  }

  toggleSearchUser(index: number) {
    this.tabSelectedIndex = index;
    if (index == 1)
      this.searchText = '';
  }

  logout() {
    this.homeService.auth.signOut()
  }

  searchUser() {

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home/search/', this.searchText]).catch()
    });

  }

  routeToHome() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home']).catch();
    });
  }
}
