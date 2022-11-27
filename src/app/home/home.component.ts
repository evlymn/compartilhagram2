import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../shared/services/notification/notification.service";
import {HomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sideNavOpened = false;
  user: any;
  isMobile = false;

  constructor(
    private _notificationService: NotificationService,
    public homeService: HomeService
  ) {

    this.isMobile = this.homeService.windowService.sizes.isMobile;
    this.homeService.windowService.getSizes.subscribe(s => {
      this.isMobile = s.isMobile
    })
    this.user = this.homeService.authService.user;
    this._notificationService.observable().subscribe(not => {
      if (not.key == 'toggleSideNav') {
        this.sideNavOpened = !this.sideNavOpened;
        localStorage.setItem('sideNavOpened', this.sideNavOpened.toString());
      }
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('sideNavOpened')) {
      this.sideNavOpened = JSON.parse(localStorage.getItem('sideNavOpened')!);
    }
  }
}
