import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-image-upload-item',
  templateUrl: './image-upload-item.component.html',
  styleUrls: ['./image-upload-item.component.scss']
})
export class ImageUploadItemComponent {
  @Output() onRemove = new EventEmitter();
  @Input() image: any;
  @Input() isMobile = false;
  @Input() sending = false;
  @Input() id: any;
  showRemoveIcon = false;

  deleteImg() {
    this.onRemove.emit(this.id);
  }
}
