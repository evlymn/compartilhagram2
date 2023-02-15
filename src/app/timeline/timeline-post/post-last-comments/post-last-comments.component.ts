import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {WindowService} from "../../../shared/services/window/window.service";
import {Sizes} from "../../../shared/services/window/sizes";
import {TimelineService} from "../../services/timeline.service";

@Component({
  selector: 'app-post-last-comments',
  templateUrl: './post-last-comments.component.html',
  styleUrls: ['./post-last-comments.component.scss']
})
export class PostLastCommentsComponent {
  @Input('comments') comments: any
  @Input('postId') postId: any
  @Input('isDetail') isDetail: any

  subStringFactor: any;

  constructor(public timelineService: TimelineService) {

  }


}
