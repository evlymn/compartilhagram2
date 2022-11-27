import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimelineService} from "../../timeline.service";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  @Input() comments: any;
  @Input() isDetail = false
  @Input() postId = '';
  @Input() loggedUId = '';
  @Output() commentChanged = new EventEmitter();
  @Input() item: any;

  totalComments = 0;
  userCommented = false;


  constructor(private _timelineService: TimelineService) {

    this._timelineService.auth.authState.subscribe(() => {
      this.getComments();
    })
  }

  getComments() {
    this._timelineService.getComments(this.postId).subscribe(c => {
      this.comments = c;
      this.totalComments = c.length;
      this.userCommented = c.some(d => d.uid == this.loggedUId)
      this.commentChanged.emit({totalComments: this.totalComments, userCommented: this.userCommented})
    })
  }


  ngOnInit(): void {

  }


}
