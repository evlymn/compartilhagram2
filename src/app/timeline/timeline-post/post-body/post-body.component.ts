import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineService} from "../../services/timeline.service";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
 import {PostFormService} from "../../../post-form/post-form.service";
import {ImageSet} from "../../../shared/interfaces/image-set";

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {

  html!: SafeHtml;
  // @ViewChild('postTextElement') postTextElement!: ElementRef;
  @Input() post: any;
  @Input() isComment = false;
  @Input() isDetail = false;
  @Input() index = 0;
  @Input() loggedUId = '';
  @Input() isRepost = false;
  isExchangeagram = false
  postText = '';
  newPostText = '';
  postPanelOpened = false;
  deletePanelOpened = false
  images: ImageSet[] = [];
  deletedImages: any[] = [];

  constructor(
    public sanitizer: DomSanitizer,
    public timelineService: TimelineService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _postFormService: PostFormService
  ) {
    this.isExchangeagram = window.location.host == 'exchangeagram.app';
    this._notificationService.observable().subscribe(s => {
      if (s.key == 'togglePostPanel' && s.value == this.post.id) {
        this.togglePostPanel();
      }
      if (s.key == 'toggleDeletePanel' && s.value == this.post.id) {
        this.toggleDeletePanel();
      }
    })
    this.timelineService.auth.authState.subscribe(() => {
      this.postText = this.post?.text;
      if (this.post.hasImages)
        try {
          for (const img of this.post.images) {
            this.images.push({imageURL: img.imageURL, file: new File([], '')})
          }
        } catch {
        }

    })
  }

  async deletePost() {
    this.timelineService.deletePost(this.post).then(() => {
      if (!this.post.isComment)
        this._router.navigate(['/home']).catch();
    })
  }

  showImageDialog(imageURL: any) {
    this.openImageViewDialog(imageURL);
  }

  togglePostPanel() {
    this.postPanelOpened = !this.postPanelOpened;
  }

  onExpansionPostClose() {
    // this.postText = this.post.postText;
  }

  toggleDeletePanel() {
    this.deletePanelOpened = !this.deletePanelOpened;
  }

  onExpansionDeleteOpen() {
    this.postPanelOpened = false;
  }

  openImageViewDialog(data: any) {
    this.timelineService.openImageViewDialog(data);
  }

  async editPost() {
    this.postText = this.newPostText;// this.postTextElement.nativeElement.innerHTML;
    this.postPanelOpened = !this.postPanelOpened;
    const newPostText = this.postText;
    const parentId = this._route.snapshot.paramMap.get('id') as string;
    this.images = this.images.filter(i => i.imageURL != '');
    this.timelineService.updatePost(this.post.id, {text: newPostText}, parentId, this.isComment).then(async () => {
      this.post.postText = newPostText.trim();
      this.timelineService.deleteImagesByIndex(this.post.id, this.deletedImages);
      this.images = await this._postFormService.uploadImages(this.images,
        this.post.id, this.timelineService.auth.user?.uid, this.timelineService.auth.user?.displayName, undefined);
    }).catch();
  }

  onExpansionPostOpen() {
    this.deletePanelOpened = false;
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.post.text);
  }

  ngOnInit(): void {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.post.text);
  }

  textChanged(e: any) {
    this.newPostText = e;
  }

  imagesChanged(e: any) {
    this.images = [];
    this.images.push(...e)
  }

  imageDeleted(e: any) {
    this.deletedImages.push(e);
    console.log(this.deletedImages)
  }
}
