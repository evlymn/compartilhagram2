import {Component, Input, OnInit} from '@angular/core';
import {ImageViewService} from "../../image-view/image-view.service";
import {MessagesService} from "../messages.service";
import {FavoriteService} from "../../shared/services/favorite/favorite.service";
import {AuthenticationService} from "../../shared/services/firebase/authentication/authentication.service";
import {equalTo, orderByValue} from "@angular/fire/database";

@Component({
  selector: 'app-chat-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.scss']
})
export class MessagesItemComponent implements OnInit {
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
     this.getTotalFavoritesByUser( `chat/messages/favorites/${this.item.roomId}/${this.item.id}/uid/`).catch();
  }

  openImage(imageURL: any) {
    this._imageView.openImageViewDialog(imageURL);
  }

  setFavorite() {
    const path = `chat/messages/favorites/${this.item.roomId}/${this.item.id}/uid/`;
    const data = {
      uid: this._auth.user?.uid,
      displayName: this._auth.user?.displayName,
      time: new Date().valueOf()
    }
    this._favoriteService.setFavorite(path, data).then(async () => {
      await this.getTotalFavoritesByUser(path);
    });
  }

  private async getTotalFavoritesByUser(path: string) {
    this.totalFavoritesByUser = await this._favoriteService.getTotalFavorites(path,
      orderByValue(),
      equalTo(this._auth.user?.uid!));
  }

  toggleDelete(id: string) {
    this.isDelete = !this.isDelete;
  }

  delete(id: string) {
    this.messageService.deleteMessage(this.item.roomId, this.item.id).catch();
  }
}
