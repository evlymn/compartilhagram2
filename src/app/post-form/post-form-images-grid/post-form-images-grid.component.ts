import {Component, Input} from '@angular/core';
import {ImageSet} from "../interfaces/image-set";

@Component({
  selector: 'app-post-form-images-grid',
  templateUrl: './post-form-images-grid.component.html',
  styleUrls: ['./post-form-images-grid.component.scss']
})
export class PostFormImagesGridComponent {

  @Input() images: ImageSet[] = [];
  @Input() sendingPost = false;
  @Input() isMobile = false;

  deleteImg(i: number) {
    this.images.splice(i, 1);
  }
}
