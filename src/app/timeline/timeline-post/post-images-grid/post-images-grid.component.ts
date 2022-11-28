import {Component, Input, OnInit} from '@angular/core';
import {WindowService} from "../../../shared/services/window/window.service";

@Component({
  selector: 'app-post-images-grid',
  templateUrl: './post-images-grid.component.html',
  styleUrls: ['./post-images-grid.component.scss']
})
export class PostImagesGridComponent implements OnInit {
  @Input() postId!: number;
  @Input() postIndex!: number;
  @Input() images: any
  isMobile = this._windowService.sizes.isMobile;
  index = 0;

  constructor(private _windowService: WindowService) {
    this._windowService.getSizes.subscribe(s => {
      this.isMobile = s.isMobile;
    })
  }

  selectImage(i: number) {
    this.index = i;
  }

  ngOnInit(): void {
  }

}
