import {Injectable} from '@angular/core';
import {fromEvent, Observable, Subject, Subscription} from "rxjs";
import {Sizes} from "./sizes";

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private resizeObservable!: Observable<Event>
  resizeSubscription!: Subscription;
  sizes: Sizes = {height: 0, width: 0, isDesktop: true, isMobile: true};
  private resizeSubject = new Subject<Sizes>();

  constructor() {
    if (!this.resizeSubscription)
      this.observeResize();
  }

  get getSizes() {
    return this.resizeSubject.asObservable();
  }

  private observeResize() {
    this.next(window.innerWidth, window.innerHeight);
    this.resizeObservable = fromEvent(window, 'resize')
    this.resizeSubscription = this.resizeObservable.subscribe((evt: any) => {
      this.next(evt.target?.innerWidth, evt.target?.innerHeight)
    })
  }

  private next(innerWidth: number, innerHeight: number) {
    this.sizes.width = innerWidth;
    this.sizes.height = innerHeight;
    this.sizes.isDesktop = innerWidth >= 850;
    this.sizes.isMobile = innerWidth <= 500;
    this.resizeSubject.next({
      width: this.sizes.width,
      height: this.sizes.height,
      isDesktop: this.sizes.isDesktop,
      isMobile: this.sizes.isMobile
    });
  }
}
