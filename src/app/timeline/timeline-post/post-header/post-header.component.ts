import {Component, Input, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {
  TimelineBadgeInfoBottomSheetComponent
} from "../../timeline-badge-info-bottom-sheet/timeline-badge-info-bottom-sheet.component";
import {TimelineService} from "../../timeline.service";


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

  constructor(private _bottomSheet: MatBottomSheet,
              private _notificationService: NotificationService,
              public  timelineService: TimelineService
  ) {

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
    this._notificationService.next('togglePostPanel', this.post.id);
  }

  openDeletePanel() {
    this._notificationService.next('toggleDeletePanel', this.post.id);

  }

  showDetail() {
    this._notificationService.next('showDetail', {post: this.post, index: 1});
  }

  showFeed() {
    this._notificationService.next('showFeed', null);
  }
}
