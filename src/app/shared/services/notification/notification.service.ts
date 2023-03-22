import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<{
    key: string,
    value: any
  }>();

  async next(key: string, value: any) {
    return new Promise<boolean>(resolve => {
      this.notificationSubject.next({
        key,
        value
      })
      resolve(true)
    })
  }


  get() {
    return this.notificationSubject.asObservable();
  }

  constructor() {
  }
}
