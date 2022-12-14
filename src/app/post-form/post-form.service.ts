import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {ImageSet} from "./interfaces/image-set";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {StorageService} from "../shared/services/firebase/storage/storage.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {AlertsService} from "../alerts/alerts.service";
import {TimelineService} from "../timeline/timeline.service";
import {AlbumService} from "../shared/services/album/album.service";
import {LanguageService} from "../shared/services/language/language.service";
import {PostData} from "./interfaces/post-data";
import {PostFormBottomSheetComponent} from "./post-form-bottom-sheet/post-form-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Injectable({
  providedIn: 'root'
})
export class PostFormService {
  panelPost = true;
  panelSearch = false;

  constructor(private _realtime: RealtimeService,
              private _storage: StorageService,
              public auth: AuthenticationService,
              private _alertsService: AlertsService,
              private _timelineService: TimelineService,
              private _albumService: AlbumService,
              public languageService: LanguageService,
              private _bottomSheet: MatBottomSheet,) {
  }

  createId() {
    return this._realtime.createId();
  }

  togglePostForm() {
    this.panelSearch = !this.panelSearch;
    this.panelPost = !this.panelPost;
  }

  // openFormPanel() {
  //   this._bottomSheet.open(PostFormBottomSheetComponent, {
  //     panelClass: 'bottom-sheet-class', disableClose: true
  //   });
  // }

  selectPanel(event: any, search?: boolean) {
    event.preventDefault();
    event.stopPropagation();
    if (search) {
      this.panelSearch = true;
      this.panelPost = false;
    }
    this._bottomSheet.open(PostFormBottomSheetComponent, {
      panelClass: 'bottom-sheet-class', disableClose: true
    });
  }

  // selectSearchPanel(event: any) {
  //   this.panelSearch = true;
  //   this.panelPost = false;
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this._bottomSheet.open(PostFormBottomSheetComponent, {
  //     panelClass: 'bottom-sheet-class', disableClose: true
  //   });
  // }

  // async getAlbum(albumId: string, postUId: string) {
  //   return this._albumService.getAlbum(albumId, postUId);
  // }

  async getAlbums() {
    return this._albumService.getAlbums();
  }

  async createAlbum(album: string) {
    return await this._albumService.createAlbum(album);
  }

  repostToFollowers(posId: string) {
    this._timelineService.repostToFollowers(posId);
  }

  async savePost(postId: string, images: ImageSet[], postText: string, album?: { id: string, album?: string }) {
    const uid = this.auth.user?.uid;
    const displayName = this.auth.user?.displayName;
    const postData = {
      id: postId,
      uid,
      displayName: displayName!,
      displayNameSearch: displayName!.toLowerCase(),
      photoURL: this.auth.user?.photoURL,
      postText: postText,
      dateTime: new Date().getTime(),
      albumName: album?.album ?? null,
      albumId: album?.id ?? null,
      hasImages: images.length > 0
    } as PostData
    await this._realtime.set('timeline/messages/' + postId, postData);
    this._realtime.set(`timeline/messages-by-user/${uid}/${postId}`, postData).catch();

    for (let i = 0; i < images.length; i++) {
      images[i].postId = postId as string;
      const local = `timeline/messages/${postId}/images/${i}`;
      const objectName = `${local}/${images[i].file.name}`;
      const objectId = `${environment.firebase.storageBucket}/${objectName}`
      const maxsize = 2500;
      const blob = await this._storage.resizeImage({maxSize: maxsize, file: images[i].file}) as Blob;
      const file = this._storage.blobToFile(blob, images[i].file.name, {
        type: images[i].file.type,
        lastModified: images[i].file.lastModified
      });

      const uploadTask = this._storage.uploadBytesResumable(objectName, file,
        {
          cacheControl: 'public, max-age=31536000', customMetadata: {
            uid: uid!,
            displayName: displayName as string,
            fileName: images[i].file.name,
            id: postId as string,
            albumName: album?.album ?? '',
            albumId: album?.id ?? '',
          }
        }
      )

      uploadTask.then(async (snapshot: { ref: { fullPath: string; }; }) => {
        const imageURL = await this._storage.getDownloadURL(snapshot.ref.fullPath);
        const photoId = this._realtime.createId();
        this._realtime.set(`timeline/albums/photos/by-user/${this.auth.user?.uid}/${photoId}`, {
          albumName: album?.album ?? 'timeline',
          albumId: album?.id ?? null,
          imageURL,
          objectName,
          photoId,
          postId
        }).catch();

        if (album) {
          this._realtime.update(`timeline/albums/photos/by-post/${this.auth.user?.uid}/${album.id}/info`, {
            albumName: album?.album,
            albumId: album?.id ?? null,
            uid: uid!,
            displayName: displayName as string,
            photoURL: this.auth.user?.photoURL,
            photoId
          }).catch();

          await this._realtime.set(`timeline/albums/photos/by-post/${this.auth.user?.uid}/${album.id}/list/${photoId}`, {
            imageURL,
            albumName: album?.album ?? null,
            albumId: album?.id ?? null,
            uid: uid!,
            postId: postId as string,
            displayName: displayName as string,
            photoId,
          });
        }

        const imageDataUpdate = {
          imageURL,
          objectName,
          objectId,
          albumName: album?.album ?? null,
          albumId: album?.id ?? null,
          photoId
        };
        this._realtime.set(`timeline/messages/${postId}/images/${i}`, imageDataUpdate).catch();
        this._realtime.set(`timeline/messages-by-user/${uid}/${postId}/images/${i}`, imageDataUpdate).catch();
      })
      images[i].uploadTask = this._storage.percentage(uploadTask);
    }
    return images;
  }
}
