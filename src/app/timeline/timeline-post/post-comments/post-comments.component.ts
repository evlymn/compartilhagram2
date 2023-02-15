import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TimelineService} from "../../services/timeline.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  @Output() commentChanged = new EventEmitter();
  @Input() isDetail = false
  postId = '';
  loggedUId = '';
  comments: any;
  totalComments = 0;
  userCommented = false;
  getCommentsSubscription!: Subscription;

  constructor(
    private _timelineService: TimelineService,
    private _route: ActivatedRoute
  ) {
    this.postId = _route.snapshot.paramMap.get('id') as string;
    this._timelineService.auth.authState.subscribe(user => {
      this.loggedUId = user?.uid as string;
      this.getComments();
    })
  }


  getComments() {
    this.getCommentsSubscription = this._timelineService.getComments(this.postId).subscribe(c => {
      this.comments = c;
      this.totalComments = c.length;
      this.userCommented = c.some(d => d.uid == this.loggedUId)
      this.commentChanged.emit({totalComments: this.totalComments, userCommented: this.userCommented})
    })
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.getCommentsSubscription)
      this.getCommentsSubscription.unsubscribe();
  }


}
