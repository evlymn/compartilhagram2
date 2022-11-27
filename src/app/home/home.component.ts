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
  user:any;
  constructor(
    private _notificationService: NotificationService,
    private _homeService: HomeService
  ) {
    this.user = this._homeService.authService.user;
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
