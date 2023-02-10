import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {MatDialog} from "@angular/material/dialog";
import {TimelineService} from "../timeline.service";


@Component({
  selector: 'app-timeline-post',
  templateUrl: './timeline-post.component.html',
  styleUrls: ['./timeline-post.component.scss']
})
export class TimelinePostComponent implements OnInit, AfterViewInit {
  @Input() post: any;
  @Input() isComment: boolean = false;
  @Input() index!: any;
  @Input() isDetail = false;
  @Input() isRepost = false;
  @Output() onDelete = new EventEmitter();
  img = false
  postId = '';
  images: any[] = [];
  comments: any
  totalComments = 0;
  loggedUId = '';
  postText = '';

  userCommented = false;

  constructor(
    private _route: ActivatedRoute,
    public timelineService: TimelineService,
    private _dialog: MatDialog,
    private _router: Router
  ) {

    this.postId = this._route.snapshot.paramMap.get('id') as string;
    this.index = this._route.snapshot.paramMap.get('index');
    this.loggedUId = this.timelineService.auth.user?.uid as string;

    this.timelineService.auth.authState.subscribe(() => {
      this.getPost().catch();
    })
  }


  async getPost() {
    if (!this.isRepost) {
      if (this.postId && !this.post?.isComment ) {
        this.post = await this.timelineService.getPost(this.postId);
        this.postText = this.post.postText;
      }
    }
  }

  ngOnInit(): void {
    if (this.post) {
      this.images = this.post.images;
      this.postText = this.post.postText;
    }
    setTimeout(s => {
      this.img = true;
    }, 1500)
  }


  ngAfterViewInit(): void {

  }

  commentChanged(event: any) {
    this.totalComments = event.totalComments;
    this.userCommented = event.userCommented;
  }
}
