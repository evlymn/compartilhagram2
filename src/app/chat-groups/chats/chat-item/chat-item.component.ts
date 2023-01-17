import {Component, Input, OnInit} from '@angular/core';
import {ImageViewService} from "../../../image-view/image-view.service";
import {MessagesService} from "../../../messages/messages.service";
import {FavoriteService} from "../../../shared/services/favorite/favorite.service";
import {AuthenticationService} from "../../../shared/services/firebase/authentication/authentication.service";
import {equalTo, orderByChild} from "@angular/fire/database";

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {
  @Input() item: any;
  @Input() loggedUid = '';
  userFavorited = false;
  isDelete = false;
  totalFavoritesByUser = 0;

  constructor(private _imageView: ImageViewService,
              public messageService: MessagesService,
              private _favoriteService: FavoriteService,
              private _auth: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  openImage(imageURL: any) {
    this._imageView.openImageViewDialog(imageURL);
  }

  setFavorite(post: any) {
    const path = `chat/messages/favorites/${this.item.roomId}/${this.item.id}/`;
    const data = {
      uid: this._auth.user?.uid,
      displayName: this._auth.user?.displayName,
      time: new Date().valueOf()
    }
    this._favoriteService.setFavorite(path, data).then(async () => {
      this.totalFavoritesByUser = await this._favoriteService.getTotalFavorites(path, orderByChild('uid'), equalTo(this._auth.user?.uid as string))
    });
  }

  toggleDelete(id: string) {
    this.isDelete = !this.isDelete;
  }

  delete(id: string) {
    this.messageService.deleteMessage(this.item.roomId, this.item.id).catch();
  }
}
