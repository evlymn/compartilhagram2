import {Component, Input, OnInit} from '@angular/core';
import {WindowService} from "../../../shared/services/window/window.service";
import {TimelineService} from "../../timeline.service";

@Component({
  selector: 'app-post-images-grid',
  templateUrl: './post-images-grid.component.html',
  styleUrls: ['./post-images-grid.component.scss']
})
export class PostImagesGridComponent implements OnInit {
  @Input() post: any;
  @Input() postId!: string;
  @Input() postIndex!: number;
  @Input() images: any
  isMobile = this._windowService.sizes.isMobile;
  index = 0;

  constructor(private _windowService: WindowService, private _timelineService: TimelineService) {
    this._windowService.getSizes.subscribe(s => {
      this.isMobile = s.isMobile;
    })
  }

  selectImage(i: number) {
    this.index = i;
  }

  ngOnInit(): void {
  }

  // clickCount = 0;

  onDoubleClick(url: string) {
    // this.clickCount++;
    this.openImage(url);
    // setTimeout(() => {
    //   if (this.clickCount === 1) {
    //     this.openImage(url);
    //   } else if (this.clickCount === 2) {
    //     this.favoritePost()
    //   }
    //   this.clickCount = 0;
    // }, 250)
  }


  private openImage(url: string) {
    this._timelineService.openImageViewDialog(url);
  }

  private favoritePost() {
    this._timelineService.setFavorite(this.post).catch();
  }
}
