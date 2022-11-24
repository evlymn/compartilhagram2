import {Injectable} from '@angular/core';
import {fromEvent, Observable, Subject, Subscription} from "rxjs";
import {Sizes} from "./sizes";

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  resizeObservable!: Observable<Event>
  resizeSubscription!: Subscription;
  sizes: Sizes = {height: 0, width: 0, isDesktop: true, isMobile: true};
  resizeSubject = new Subject<Sizes>();

  constructor() {
  }

  observeResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.sizes.isDesktop = window.innerWidth >= 850;
    this.sizes.isMobile = window.innerWidth <= 500;
    this.resizeSubject.next({
      width: this.sizes.width,
      height: this.sizes.height,
      isDesktop: this.sizes.isDesktop,
      isMobile: this.sizes.isMobile
    });
    this.resizeObservable = fromEvent(window, 'resize')
    this.resizeSubscription = this.resizeObservable.subscribe((evt: any) => {
      this.sizes.width = evt.target?.innerWidth;
      this.sizes.height = evt.target?.innerHeight;
      this.sizes.isDesktop = evt.target?.innerWidth >= 850;
      this.sizes.isMobile = evt.target?.innerWidth <= 500;
      this.resizeSubject.next({
        width: this.sizes.width,
        height: this.sizes.height,
        isDesktop: this.sizes.isDesktop,
        isMobile: this.sizes.isMobile
      });
    })
  }
}
