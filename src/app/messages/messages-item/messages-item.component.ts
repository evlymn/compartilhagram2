import {Component, Input, OnInit} from '@angular/core';
import {ImageViewService} from "../../image-view/image-view.service";

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.scss']
})
export class MessagesItemComponent implements OnInit {
  @Input() item: any;
  @Input() loggedUid = '';
  userFavorited =false;

  constructor(private _imageView: ImageViewService) {
  }

  ngOnInit(): void {
  }

  openImage(imageURL: any) {
    this._imageView.openImageViewDialog(imageURL);
  }

  setFavorite(post: any) {

  }
}
