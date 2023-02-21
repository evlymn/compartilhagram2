import {Injectable, OnDestroy} from "@angular/core";
import {StorageService} from "../../shared/services/firebase/storage/storage.service";
import {AuthenticationService} from "../../shared/services/firebase/authentication/authentication.service";
import {DataSnapshot, equalTo, orderByChild, Unsubscribe} from "@angular/fire/database";
import {TimelineDatabaseService} from "./timeline-database.service";
import {TimelineDatabaseTriggersService} from "./timeline-database-triggers.service";

@Injectable({
  providedIn: 'root'
})
export class TimelinePostDeleteService implements OnDestroy {
  onTimelineMessageRemovedUnsubscribe!: Unsubscribe

  constructor(
    public dbTriggers: TimelineDatabaseTriggersService,
    private _realtime: TimelineDatabaseService,
    private _storage: StorageService,
    public auth: AuthenticationService
  ) {
    this.onTimelineMessageRemoved();
  }


  async deletePost(postId: string) {
    return this._realtime.update('timeline/messages/' + postId, {
      deleted: true
    }).then(() => {
      this._realtime.delete('timeline/messages/' + postId).catch();
    })
  }

  deleteComments(postId: string) {
    this._realtime.delete(`timeline/comments/${postId}`).catch();
  }

  deleteFavorites(postId: string) {
    this._realtime.delete(`timeline/favorites/comments/${postId}/`).catch();
    this._realtime.delete(`timeline/favorites/messages/${postId}/`).catch();
  }

  deleteReposts(repostId: string, postId: string) {
    if (repostId) {
      this._realtime.get('timeline/messages/', orderByChild('repostId'), equalTo(postId)).then(snapshot => {
        snapshot.forEach(child => {
          this._realtime.update('timeline/messages/' + child.key, {
            repostDeleted: true
          }).catch();
        })
      })
      this._realtime.delete(`timeline/repost-by-post/${repostId}/${postId}`).catch();
      this._realtime.delete(`timeline/repost-by-user/${this.auth.user?.uid}/${repostId}`).catch();
    }
  }


  deleteFollowMessages(postId: string) {
    this._realtime.get('timeline/follow/followers/' + this.auth.user?.uid).then(snapshot => {
      snapshot.forEach(child => {
        this._realtime.delete(`timeline/follow/messages/${child.val().uid}/${postId}`).catch();
      })
    })
  }


  deleteStorageImages(images: any[]) {
    if (images) {
      images.forEach(image => {
        this._storage.delete(image.objectName).catch();
      })
    }
  }

  deleteAlbumPhotosByPost(albumId: string, postId: string) {
    this._realtime.get(`/timeline/albums/photos/by-posts/${this.auth.user?.uid}/${albumId}/list`).then(snapshot => {
      snapshot.forEach(child => {
        if (child.val().postId == postId) {
          this._realtime.delete(`/timeline/albums/photos/by-posts/${this.auth.user?.uid}/${albumId}/list/${child.val().photoId}`).catch();
        }
      })
      this._realtime.get(`/timeline/albums/photos/by-posts/${this.auth.user?.uid}/${albumId}/list`).then(snapshot => {
        if (snapshot.size == 0) {
          this._realtime.delete(`/timeline/albums/photos/by-posts/${this.auth.user?.uid}/${albumId}`).catch();
        }
      })
    })
  }

  deleteAlbumPhotosByUser(postId: string) {
    this._realtime.get(`timeline/albums/photos/by-users/${this.auth.user?.uid}`).then(snapshot => {
      snapshot.forEach(child => {
        if (child.val().postId == postId) {
          this._realtime.delete(`timeline/albums/photos/by-users/${this.auth.user?.uid}/${child.val().photoId}`).catch();
        }
      })
    });
  }

  deleteMessagesByUser(postId: string) {
    this._realtime.delete(`timeline/messages-by-user/${this.auth.user?.uid}/${postId}`).catch();
  }

  deleteSavedPosts(postId: string) {
    this._realtime.get('timeline/saved').then(snapshot => {
      snapshot.forEach(user => {
        user.forEach(post => {
          if (post.key == postId) {
            this._realtime.delete(`timeline/saved/${user.key}/${post.key}`).catch();
          }
        })
      })
    }).catch()
  }


  onTimelineMessageRemoved() {
    this.onTimelineMessageRemovedUnsubscribe = this.dbTriggers.getMessageChildOnRemoved(snapshot => {
      if (this.auth.user?.uid == snapshot.val().uid) {
        const postId = snapshot.key as string;
        this.deleteFollowMessages(postId);
        this.deleteFavorites(postId);
        this.deleteReposts(snapshot.val().repostId, postId);
        this.deleteStorageImages(snapshot.val().images);
        this.deleteAlbumPhotosByPost(snapshot.val().albumId, postId);
        this.deleteAlbumPhotosByUser(postId);
        this.deleteMessagesByUser(postId);
        this.deleteSavedPosts(postId);
        this.deleteComments(postId);
      }
    })
  }


  ngOnDestroy(): void {
    if (this.onTimelineMessageRemovedUnsubscribe) {
      this.onTimelineMessageRemovedUnsubscribe()
    }
  }

}
