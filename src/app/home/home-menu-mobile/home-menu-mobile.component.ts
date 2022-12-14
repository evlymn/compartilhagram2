import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {HomeService} from "../home.service";
import {AlertsService} from "../../alerts/alerts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-menu-mobile',
  templateUrl: './home-menu-mobile.component.html',
  styleUrls: ['./home-menu-mobile.component.scss']
})
export class HomeMenuMobileComponent implements AfterViewInit {
  @ViewChildren('tooltip') tooltips = QueryList<ElementRef>;


  user: any;

  constructor(public homeService: HomeService, private router: Router, public alertsService: AlertsService) {
    this.homeService.authService.authState.subscribe(user => {
      this.user = user;
    })


  }


  routeToHome() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home']).catch();
    });
  }

  ngAfterViewInit() {

    // for (let tooltipKey in this.tooltip.length) {
    //   console.log(tooltipKey)
    // }
  }

  viewToolTips() {
    // @ts-ignore
    this.tooltips.forEach(tt => {
      tt.toggle()
    })
  }

  logout() {
    this.homeService.auth.signOut();
  }
}
