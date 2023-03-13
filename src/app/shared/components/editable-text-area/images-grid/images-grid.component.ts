import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageSet} from "./image-set";
import {StorageService} from "../../../services/firebase/storage/storage.service";

@Component({
  selector: 'app-post-form-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss']
})
export class ImagesGridComponent {
  @Output() onImageDeleted = new EventEmitter();
  @Input() images: ImageSet[] = [];
  @Input() sendingPost = false;
  @Input() isMobile = false;

  constructor(
    private _storageService: StorageService
  ) {
  }

  deleteImg(i: number) {
    const image = this.images[i]
    this.images.splice(i, 1);
    this.onImageDeleted.emit({index: i, imageURL: image.imageURL});
  }
}
