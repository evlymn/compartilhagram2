import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {WindowService} from "../../../../shared/services/window/window.service";
import {Sizes} from "../../../../shared/services/window/sizes";

@Component({
  selector: 'app-last-comments-item',
  templateUrl: './last-comments-item.component.html',
  styleUrls: ['./last-comments-item.component.scss']
})
export class LastCommentsItemComponent {
  @Input('comment') comment: any
  subStringFactor: any;
  itsLessThanAMinute = true;

  constructor(private _router: Router, private windowService: WindowService) {
    this.getFactor(this.windowService.sizes);
    this.windowService.getSizes.subscribe(s => {
      this.getFactor(s);
    })
  }

  getFactor(s: Sizes) {
    if (s.width < 390) {
      this.subStringFactor =   27;
    } else if (s.isMobile) {
      this.subStringFactor = 39
    } else if (s.isMiddleSize || s.isDesktop) {
      this.subStringFactor = 70
    }
   }

  getSeconds(time: any) {
    const d = new Date(time);
    const now = new Date();
    const seconds =  Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    this.itsLessThanAMinute = seconds < 60;
     // this.subStringFactor =  this.itsLessThanAMinute ? 20 : 30;
    return '';
  }
}
