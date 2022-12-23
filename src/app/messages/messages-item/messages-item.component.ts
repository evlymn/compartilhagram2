import {Component, Input, OnInit} from '@angular/core';
import {ImageViewService} from "../../image-view/image-view.service";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.scss']
})
export class MessagesItemComponent implements OnInit {
  @Input() item: any;
  @Input() loggedUid = '';
  userFavorited = false;
  isDelete = false;

  constructor(private _imageView: ImageViewService,
              public messageService: MessagesService) {
  }

  ngOnInit(): void {
  }

  openImage(imageURL: any) {
    this._imageView.openImageViewDialog(imageURL);
  }

  setFavorite(post: any) {

  }

  toggleDelete(id: string) {
    this.isDelete = !this.isDelete;
  }

  delete(id: string) {
    this.messageService.deleteMessage(this.item.roomId, this.item.id).catch();
  }
}
