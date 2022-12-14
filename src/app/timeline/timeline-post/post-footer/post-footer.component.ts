import {Component, Input, OnInit} from '@angular/core';
import {TimelineService} from "../../timeline.service";
import {AlertsService} from "../../../alerts/alerts.service";


@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {
  @Input() post: any;
  @Input() isDetail = false;
  @Input() index = 0;
  @Input() loggedUId = '';
  @Input() totalComments = 0;
  @Input() userCommented = false;
  @Input() isRepost = false;
  commentPanelOpened = false
  repostText = '';
  userFavorited = false;
  commentRepost = '';
  totalFavorites = 0;
  deletePanelOpened = false;
  commentText = '';
  repostPanelOpened = false;
  totalRepost = 0;
  existsSaved = false;
  messageRoute = 'messages'

  constructor(private _timelineService: TimelineService,
              private _alertsService: AlertsService) {
    this._timelineService.auth.authState.subscribe(async () => {
      this.messageRoute = this.isDetail ? '../../../messages' : this.messageRoute;

      this.getTotalFavorites();
      this.getReposts();
      this.existsSaved = await this._timelineService.existsSaved(this.post.id);
    })
  }

  getReposts() {
    this._timelineService.getReposts(this.post?.id).subscribe(r => {
      this.totalRepost = r.length;
    })
  }

  getTotalFavorites() {
    const id = this.post?.id;
    this._timelineService.getTotalFavorites(id).subscribe(async t => {
      this.totalFavorites = t.length;
      this.userFavorited = t.some(s => s.uid == this.loggedUId)
    })
  }

  toggleCommentPanel() {
    this.commentPanelOpened = !this.commentPanelOpened;
  }

  setFavorite(post: any) {
    this._timelineService.setFavorite(post).catch();
  }

  repost(postId: string) {
    const text = this.repostText
    this._timelineService.repost(postId, text, this.post).catch();
  }

  onExpansionCommentOpen() {
    this.deletePanelOpened = false;
  }

  onExpansionClose() {
    this.commentText = '';
  }

  createComment() {
    this._timelineService.createComment(this.post.id, this.commentText).then(commentId => {
      if (this.post.uid != this._timelineService.auth.user?.uid) {
        this._alertsService.createAlert('comment', this.post.uid, {
          postId: this.post.id,
          commentId,
          type: 'comment ',
          ptText: this._timelineService.languageService.getTextByLang('comentou','pt'),
          enText: this._timelineService.languageService.getTextByLang('comentou','en'),
          icon: 'chat_bubble',
          text: this.commentText,
          image: this.post.images ? this.post.images[0].imageURL : null
        })
      }
      this.commentPanelOpened = false;
    })
  }

  ngOnInit(): void {
  }

  onExpansionRepostClose() {
    this.commentRepost = '';
  }

  onExpansionRepostOpen() {

  }

  async createSaved(post: any) {
    if (!this.existsSaved)
      this._timelineService.createSavedPost(post).then(() => {
        this.existsSaved = true;
      });
    else {
      this._timelineService.deleteSavedPost(post.id).then(() => {
        this.existsSaved = false;
      });
    }
  }
}
