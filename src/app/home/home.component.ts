import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../shared/services/notification/notification.service";
import {HomeService} from "./home.service";
import homeAnimations from "./home.animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [homeAnimations]

})
export class HomeComponent implements OnInit {
  // sideNavOpened = false;
  user: any;
  isMobile = this.homeService.windowService.sizes.isMobile;
  isMiddleSize = this.homeService.windowService.sizes.isMiddleSize;
  windowHeight = this.homeService.windowService.sizes.height;

  constructor(

    private _notificationService: NotificationService,
    public homeService: HomeService
  ) {
    // @ts-ignore
    // navigator.setAppBadge(22);
    this.windowHeight = this.homeService.windowService.sizes.height;
    this.homeService.windowService.getSizes.subscribe(s => {
      this.isMobile = s.isMobile
      this.isMiddleSize = s.isMiddleSize;
      this.windowHeight = s.height;
    })
    this.user = this.homeService.authService.user;
    // this._notificationService.observable().subscribe(not => {
    //   if (not.key == 'toggleSideNav') {
    //     this.homeService.sideNavOpened = !this.homeService.sideNavOpened;
    //     localStorage.setItem('sideNavOpened', this.homeService.sideNavOpened.toString());
    //   }
    // })
  }

  ngOnInit(): void {
    // if (localStorage.getItem('sideNavOpened')) {
    //   this.homeService.sideNavOpened = JSON.parse(localStorage.getItem('sideNavOpened')!);
    // }
  }

  toggleSideNav() {
    this.homeService.toggleSideNav();
  }
}
