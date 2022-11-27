import {Injectable} from '@angular/core';
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {NotificationService} from "../shared/services/notification/notification.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public authService: AuthenticationService,
              private _notificationService: NotificationService,
              private _router: Router,
              public auth: AuthenticationService) {
  }


}
