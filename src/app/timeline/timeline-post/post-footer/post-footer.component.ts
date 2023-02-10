import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TimelineService} from "../../timeline.service";
import {AlertsService} from "../../../alerts/alerts.service";
import {StorageService} from "../../../shared/services/firebase/storage/storage.service";
import {WindowService} from "../../../shared/services/window/window.service";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {
  @ViewChild('file') file!: ElementRef;
  @Input() post: any;
  @Input() isComment: Boolean = false;
  @Input() isDetail = false;
  @Input() index = 0;
  @Input() loggedUId = '';
  @Input() totalComments = 0;
  @Input() userCommented = false;
  @Input() isRepost = false;
  image: any = {};
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
  isMobile = this.windowService.sizes.isMobile;
  sendingPost = false;

  constructor(
    private _timelineService: TimelineService,
    private _storageService: StorageService,
    private _alertsService: AlertsService,
    private _route: ActivatedRoute,
    private windowService: WindowService) {


    this.windowService.getSizes.subscribe(sizes => {
      this.isMobile = sizes.isMobile;
    })
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
    this._timelineService.createComment(this.post.id, this.commentText, !!this.image.image64).then(commentId => {
      if (this.image.image64) {
        this.image.image64 = null;
        this._storageService.resizeImage({maxSize: 2500, file: this.image.file}).then(b => {
          const file = this._storageService.blobToFile(b, this.image.file.name, {
            type: this.image.file.type,
            lastModified: this.image.file.lastModified
          })
          const path = `timeline/comments/${this.post.id}/${commentId}/${this.image.file.name}`;
          const objectName = path;
          const objectId = `${environment.firebase.storageBucket}/${objectName}`
          this._storageService.uploadBytes(path, file, {
            customMetadata: {}
          }).then(async () => {
            const downloadURL = await this._storageService.getDownloadURL(path);
            this._timelineService.updateComment(this.post.id, commentId as string, {
              images: [{
                imageURL: downloadURL,
                objectId,
                objectName
              }]
            }).catch()
          });
        })
      }

      if (this.post.uid != this._timelineService.auth.user?.uid) {
        this._alertsService.createAlert('comment', this.post.uid, {
          postId: this.post.id,
          commentId,
          type: 'comment ',
          ptText: this._timelineService.languageService.getTextByLang('comentou', 'pt'),
          enText: this._timelineService.languageService.getTextByLang('comentou', 'en'),
          icon: 'chat_bubble',
          text: this.commentText,
          image: this.post.images ? this.post.images[0].imageURL : null
        })
      }
      this.commentPanelOpened = false;
    })
  }

  ngOnInit(): void {
    this.commentText  = this.post.text;
    console.log(this.commentText)

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

  goBack() {
    history.back();
  }

  async fileChangeEvent(e: any) {
    this.image.image64 = await this._storageService.fileToBase64(e.target.files[0]) as string
    this.image.file = e.target.files[0];
    this.file.nativeElement.value = null;
  }

  onRemoveImage(e: any) {
    this.image.image64 = null;
  }
}
