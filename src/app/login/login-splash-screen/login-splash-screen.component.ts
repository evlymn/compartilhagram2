import {Component} from '@angular/core';
import {AuthenticationService} from "../../shared/services/firebase/authentication/authentication.service";

@Component({
  selector: 'app-login-splash-screen',
  templateUrl: './login-splash-screen.component.html',
  styleUrls: ['./login-splash-screen.component.scss']
})
export class LoginSplashScreenComponent {
  logo = 'assets/images/compartilhagram-logo.png';

  constructor(public auth: AuthenticationService) {
    if (window.location.host.includes('exchangeagram')) {
      this.logo = 'assets/images/exchangeagram-logo.png';
    }
  }
}
