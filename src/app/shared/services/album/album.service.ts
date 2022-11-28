import {Injectable} from '@angular/core';
import {RealtimeService} from "../firebase/database/realtime.service";
import {AuthenticationService} from "../firebase/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private _realtime: RealtimeService, public auth: AuthenticationService) {
  }

  createId() {
    return this._realtime.createId();
  }

  async getAlbum(albumId: string, postUId: string) {
    return this._realtime.get(`timeline/albums/photos/by-post/${postUId}/${albumId}`);
  }

  async getAlbums() {
    return this._realtime.get('timeline/albums/list/' + this.auth.user?.uid);
  }

  async createAlbum(album: string) {
    const id = this._realtime.createId();
    await this._realtime.set(`timeline/albums/list/${this.auth.user?.uid}/${id}`, {
      album,
      id
    });
    return {id, album}
  }

  async getPhotos() {
    return this._realtime.get(`timeline/albums/photos/by-user/${this.auth.user?.uid}`);
  }
}
