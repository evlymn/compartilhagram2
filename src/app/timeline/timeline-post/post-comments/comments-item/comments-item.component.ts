import {Component, Input, OnInit} from '@angular/core';
import {TimelineService} from "../../../services/timeline.service";


@Component({
  selector: 'app-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.scss']
})
export class CommentsItemComponent implements OnInit {
  @Input() item: any;
  totalFavorites = 0;
  commentPanelOpened2 = false;
  totalFavoritesByUser =0;

  constructor(private _timelineService: TimelineService) {
    this._timelineService.auth.authState.subscribe(async () => {
      this.totalFavorites = await this._timelineService.getTotalCommentFavorites(this.item.postId, this.item.id);
      this.totalFavoritesByUser = await this._timelineService.getTotalCommentFavoritesByUser(this.item.postId, this.item.id);
    })
  }

  openClosePanel() {
    this.commentPanelOpened2 = !this.commentPanelOpened2;
  }

  deleteComment() {
    this._timelineService.deleteComment(this.item.postId, this.item.id).catch();
  }

  onPanelCollapse() {

  }

  ngOnInit(): void {
  }

  async favoriteComment() {
    await this._timelineService.setCommentFavorite(this.item.postId, this.item.id);
    this.totalFavorites = await this._timelineService.getTotalCommentFavorites(this.item.postId, this.item.id);
    this.totalFavoritesByUser = await this._timelineService.getTotalCommentFavoritesByUser(this.item.postId, this.item.id);
  }
}
