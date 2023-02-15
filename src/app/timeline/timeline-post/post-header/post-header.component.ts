import {Component, Input, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {
  TimelineBadgeInfoBottomSheetComponent
} from "../../timeline-badge-info-bottom-sheet/timeline-badge-info-bottom-sheet.component";
import {TimelineService} from "../../services/timeline.service";
import {WindowService} from "../../../shared/services/window/window.service";


@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  @Input() post: any;
  @Input() isDetail = false;
  @Input() index = 0;
  @Input() isRepost = false;
  @Input() loggedUId = '';
  isMobile = this._windowService.sizes.width< 350;
  isExchangeagram = false

  constructor(private _bottomSheet: MatBottomSheet,
              private _notificationService: NotificationService,
              public timelineService: TimelineService,
              private _windowService: WindowService) {
    this.isExchangeagram = window.location.host.includes('exchangeagram');

    this._windowService.sizes.isMobile;
    this._windowService.getSizes.subscribe(s => {
      this.isMobile = s.width< 350;
    })

  }

  openBottomSheet(text: string, icon: string): void {

    this._bottomSheet.open(TimelineBadgeInfoBottomSheetComponent, {
      data: {text, icon},
      panelClass: 'bottom-sheet-class'
    });
  }


  ngOnInit(): void {

  }

  togglePostPanel() {
    this._notificationService.next('togglePostPanel', this.post.id).catch();
  }

  openDeletePanel() {
    this._notificationService.next('toggleDeletePanel', this.post.id).catch();

  }

  showDetail() {
    this._notificationService.next('showDetail', {post: this.post, index: 1}).catch();
  }

  showFeed() {
    this._notificationService.next('showFeed', null).catch();
  }

  showProfile(uid: string) {
    document.location = '/home/profile/' + uid;
    // this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //   this._router.navigate(['/home/profile/' + uid]).catch();
    // });

  }
}
