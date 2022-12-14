import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TimelineService} from "../../timeline.service";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {ImageViewComponent} from "../../../image-view/image-view.component";

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {
  @Input() post: any;
  @Input() isDetail = false;
  @Input() index = 0;
  @Input() loggedUId = '';
  @Input() isRepost = false;
  isExchangeagram = false
  postText = '';
  postPanelOpened = false;
  deletePanelOpened = false

  constructor(private _timelineService: TimelineService,
              private _router: Router,
              private _dialog: MatDialog,
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
    this._timelineService.auth.authState.subscribe(() => {
      this.postText = this.post?.postText;
    })
  }


  async deletePost() {
    this._timelineService.deletePost(this.post).then(() => {
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
    const dialogRef = this._dialog.open(ImageViewComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['no-padding', 'bg-color'],
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  async editPost() {
    this.postPanelOpened = !this.postPanelOpened;
    const newPostText = this.postText;
    this._timelineService.editPost(this.post.id, {postText: newPostText}).then(() => {
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
