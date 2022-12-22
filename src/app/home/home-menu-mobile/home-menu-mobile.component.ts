import {Component, QueryList, ViewChildren} from '@angular/core';
import {HomeService} from "../home.service";
import {AlertsService} from "../../alerts/alerts.service";
import {Router} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {PostFormService} from "../../post-form/post-form.service";
import HomeAnimations from "../home.animations";

@Component({
  selector: 'app-home-menu-mobile',
  templateUrl: './home-menu-mobile.component.html',
  styleUrls: ['./home-menu-mobile.component.scss'],
  animations: [HomeAnimations]
})
export class HomeMenuMobileComponent {
  @ViewChildren('tooltip') tooltips!: QueryList<MatTooltip>;
  user: any;

  constructor(public homeService: HomeService,
              private _router: Router,
              public alertsService: AlertsService,
              private _postFormService: PostFormService) {
    this.homeService.authService.authState.subscribe(user => {
      this.user = user;
    })
  }

  routeToHome() {
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this._router.navigate(['/home']).catch();
    });
  }

  viewToolTips() {
    this.tooltips.forEach(tt => {
      tt.toggle()
    })
  }

  logout() {
    this.homeService.auth.signOut();
  }

  search(e:any) {
    this._postFormService.selectPanel(e, true);
  }
}
