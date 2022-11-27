import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-images-grid',
  templateUrl: './post-images-grid.component.html',
  styleUrls: ['./post-images-grid.component.scss']
})
export class PostImagesGridComponent implements OnInit {
  @Input() postId!: number;
  @Input() postIndex!: number;
  @Input() images: any
  index = 0;

  constructor() {
  }

  selectImage(i: number) {
    this.index = i;
  }

  ngOnInit(): void {
  }

}
