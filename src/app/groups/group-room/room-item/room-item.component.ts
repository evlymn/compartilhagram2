import {Component, Input, OnInit} from '@angular/core';
import {ImageViewService} from "../../../image-view/image-view.service";
import {FavoriteService} from "../../../shared/services/favorite/favorite.service";
import {AuthenticationService} from "../../../shared/services/firebase/authentication/authentication.service";
import {equalTo, orderByChild} from "@angular/fire/database";
import {GroupsService} from "../../groups.service";

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input() item: any;
  @Input() loggedUid = '';
  userFavorited = false;
  isDelete = false;
  totalFavoritesByUser = 0;

  constructor(
    private _imageView: ImageViewService,
    public groupsService: GroupsService,
    private _favoriteService: FavoriteService,
    private _auth: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  openImage(imageURL: any) {
    this._imageView.openImageViewDialog(imageURL);
  }

  setFavorite(post: any) {
    const path = `groups/messages/favorites/${this.item.roomId}/${this.item.id}/`;
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

  delete(item: any) {
    this.groupsService.deleteMessage(item.groupId, item.id).catch();
  }

}
