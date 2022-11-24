import {Injectable} from '@angular/core';
import {Analytics, AnalyticsCallOptions, logEvent, setUserId, setUserProperties} from '@angular/fire/analytics';
import {UserCredential} from '@angular/fire/auth';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private analytics: Analytics, private authService: AuthenticationService) {
  }

  LogEvent(eventName: string, eventParams?: [key: string]): void {
    logEvent(this.analytics, eventName, eventParams)
  }

  setUserId(userId: string, options?: AnalyticsCallOptions): void {
    setUserId(this.analytics, userId, options)
  }

  setUserProperties(userCredential: UserCredential): void {
    const additionalUserInfo = this.authService.getAdditionalUserInfo(userCredential)!;
    setUserProperties(this.analytics, {
      providerId: userCredential.providerId,
      username: additionalUserInfo.username,
      isNewUser: additionalUserInfo.isNewUser,
    })
  }
}
