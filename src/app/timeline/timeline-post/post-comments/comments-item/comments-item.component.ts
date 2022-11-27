import {Component, Input, OnInit} from '@angular/core';
import {TimelineService} from "../../../timeline.service";


@Component({
  selector: 'app-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.scss']
})
export class CommentsItemComponent implements OnInit {
  @Input() item: any;
  commentPanelOpened2 = false;

  constructor(private _timelineService: TimelineService) {
    console.log(this.item)
  }

  openClosePanel() {
    this.commentPanelOpened2 = !this.commentPanelOpened2;
  }

  deleteComment(postId: string, commentId: string) {
    this._timelineService.deleteComment(postId, commentId).catch();
  }

  onPanelCollapse() {

  }

  ngOnInit(): void {
  }

}
