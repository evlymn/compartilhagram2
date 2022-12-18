import {Component} from '@angular/core';
import {NotificationService} from "../../shared/services/notification/notification.service";
import {HomeService} from "../home.service";
import {Router} from "@angular/router";
import homeAnimations from "../home.animations";

@Component({
  selector: 'app-home-header-mobile',
  templateUrl: './home-header-mobile.component.html',
  styleUrls: ['./home-header-mobile.component.scss'],
  animations:[ homeAnimations]
})
export class HomeHeaderMobileComponent {
  tabSelectedIndex = 0;
  searchText = '';

  constructor(private _notificationService: NotificationService,
              public homeService: HomeService,
              private router: Router) {
  }

  toggleSideNav() {
     this.homeService.toggleSideNav()
  }

  toggleSearchUser(index: number) {
    this.tabSelectedIndex = index;
    if (index == 1)
      this.searchText = '';
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
