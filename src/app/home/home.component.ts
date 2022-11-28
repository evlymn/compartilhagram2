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
  isMobile =  this.homeService.windowService.sizes.isMobile;
  isMiddleSize = this.homeService.windowService.sizes.isMiddleSize;
  windowHeight =  this.homeService.windowService.sizes.height;
  constructor(
    private _notificationService: NotificationService,
    public homeService: HomeService
  ) {
    this.windowHeight =  this.homeService.windowService.sizes.height;
    this.homeService.windowService.getSizes.subscribe(s => {
      this.isMobile = s.isMobile
      this.isMiddleSize =s.isMiddleSize;
      this.windowHeight = s.height;
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
