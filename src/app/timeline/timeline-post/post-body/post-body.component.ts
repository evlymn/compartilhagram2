import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineService} from "../../services/timeline.service";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {

  html!: SafeHtml;
  @ViewChild('postTextElement') postTextElement!: ElementRef;
  @Input() post: any;
  @Input() isComment = false;
  @Input() isDetail = false;
  @Input() index = 0;
  @Input() loggedUId = '';
  @Input() isRepost = false;
  isExchangeagram = false
  postText = '';
  postPanelOpened = false;
  deletePanelOpened = false

  constructor(
    public sanitizer: DomSanitizer,
    public timelineService: TimelineService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService) {
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
    this.postText = this.post.postText;
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
    this.postText = this.postTextElement.nativeElement.innerHTML;
    this.postPanelOpened = !this.postPanelOpened;
    const newPostText = this.postText;
    const parentId = this._route.snapshot.paramMap.get('id') as string;
    this.timelineService.updatePost(this.post.id, {text: newPostText}, parentId, this.isComment).then(() => {
      this.post.postText = newPostText.trim();
    }).catch();
  }

  onExpansionPostOpen() {
    this.deletePanelOpened = false;
  }

  ngOnInit(): void {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.post.text);

  }

}
