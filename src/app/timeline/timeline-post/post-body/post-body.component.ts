import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineService} from "../../timeline.service";
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {
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
      this._notificationService.next('postDeleted', this.post.id);
      this._router.navigate(['/home']).then(() => null);
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

    this.postPanelOpened = !this.postPanelOpened;
    const newPostText = this.postText;
    const parentId = this._route.snapshot.paramMap.get('id') as string;
    console.log(this.post.id, parentId)
    this.timelineService.editPost(this.post.id, {text: newPostText}, parentId, this.isComment).then(() => {
      this._notificationService.next('postEdited', {
        text: newPostText.trim(),
        id: this.post.id

      });
      this.post.postText = newPostText.trim();
    }).catch();
  }

  onExpansionPostOpen() {
    this.deletePanelOpened = false;
  }

  ngOnInit(): void {
  }

}
