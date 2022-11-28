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

  next(key: string, value: any) {
    this.notificationSubject.next({
        key,
        value
      }
    );
  }


  observable() {
    return this.notificationSubject.asObservable();
  }

  constructor() {
  }
}
