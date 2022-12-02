import {Injectable} from '@angular/core';
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {StorageService} from "../shared/services/firebase/storage/storage.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {DataSnapshot, limitToLast, orderByChild, QueryConstraint, startAt,} from "@angular/fire/database";
import {Observable} from "rxjs";
import {AlertsService} from "../alerts/alerts.service";
import {LanguageService} from "../shared/services/language/language.service";


@Injectable({
  providedIn: 'root'
})
export class TimelineService {


  constructor(private _realtime: RealtimeService,
              private _storage: StorageService,
              public auth: AuthenticationService,
              private _alertsService: AlertsService,
              public languageService: LanguageService
  ) {
  }

  getMessages(callback: (snapshot: DataSnapshot) => unknown, ...queryConstraints: QueryConstraint[]) {
    return this._realtime.onValue('timeline/messages/', callback, ...queryConstraints)
  }

  createId() {
    return this._realtime.createId();
  }

  public get authState() {
    return this.auth.authState;
  }

  async getPost(id: string): Promise<any> {
    const post = await this._realtime.get(`timeline/messages/${id}`);
    if (post.exists())
      return post.val();
  }

  deletePost(postId: string, repostId: string, albumId: string, images: any[]) {
    this._realtime.get('timeline/follow/followers/' + this.auth.user?.uid).then(followers => {
      followers.forEach(f => {
        this._realtime.delete(`timeline/follow/messages/${f.val().uid}/${postId}`).catch();
      })
    })
    return this._realtime.delete('timeline/messages/' + postId).then(() => {
      this._realtime.delete(`timeline/repost-by-post/${repostId}/${postId}`).catch();
      this._realtime.delete(`timeline/repost-by-user/${this.auth.user?.uid}/${repostId}`).catch();
      if (images) {
        images.forEach(image => {
          this._storage.delete(image.objectName).catch();
        })
      }
      this._realtime.get(`/timeline/albums/photos/by-post/${this.auth.user?.uid}/${albumId}/list`).then(snapshot => {
        snapshot.forEach(p => {
          if (p.val().postId == postId) {
            this._realtime.delete(`/timeline/albums/photos/by-post/${this.auth.user?.uid}/${albumId}/list/${p.val().photoId}`).catch();
          }
        })
        this._realtime.get(`/timeline/albums/photos/by-post/${this.auth.user?.uid}/${albumId}/list`).then(snapshot => {
          if (snapshot.size == 0) {
            this._realtime.delete(`/timeline/albums/photos/by-post/${this.auth.user?.uid}/${albumId}`).catch();
          }
        })
      })

      this._realtime.get(`timeline/albums/photos/by-user/${this.auth.user?.uid}`).then(snapshot => {
        snapshot.forEach(p => {
          if (p.val().postId == postId) {
            this._realtime.delete(`timeline/albums/photos/by-user/${this.auth.user?.uid}/${p.val().photoId}`).catch();
          }
        })
      });
      this._realtime.delete(`timeline/messages-by-user/${this.auth.user?.uid}/${postId}`).catch();
    });
  }

  getReposts(postId: string) {
    return this._realtime.onValueChanges(`timeline/repost-by-post/${postId}/`);
  }

  async editPost(postId: string, data: any) {
    data.bad_word = false;
    return this._realtime.update('timeline/messages/' + postId, data);
  }

  async createComment(postId: string, commentText: string) {
    const commentId = this._realtime.createId();
    const path = `timeline/comments/${postId}/${commentId}`;
    return this._realtime.set(path, {
      commentText,
      time: new Date().valueOf(),
      displayName: this.auth.user?.displayName,
      id: commentId,
      uid: this.auth.user?.uid,
      photoURL: this.auth.user?.photoURL,
      bad_word: false,
      postId
    }).then(() => commentId)
  }

  repostToFollowers(postId: string) {
    setTimeout(() => {
      this._realtime.get('timeline/messages/' + postId).then(snapshot => {
        const postData = snapshot.val();
        this._realtime.get('timeline/follow/followers/' + this.auth.user?.uid).then(followers => {
          followers.forEach(f => {

            this._realtime.update(`timeline/follow/messages/${f.val().uid}/${postId}`, postData).catch();
          })
        })
      })
    }, 2000);
  }

  async existsSaved(postId: string) {
    const snapshot = await this._realtime.get(`timeline/saved/${this.auth.user?.uid}/${postId}`);
    return snapshot.exists();
  }

  createSavedPost(post: any) {
    return this._realtime.set(`timeline/saved/${this.auth.user?.uid}/${post.id}`, post);
  }

  deleteSavedPost(postId: string) {
    return this._realtime.delete(`timeline/saved/${this.auth.user?.uid}/${postId}`);
  }

  getMessagesAsync(): Observable<any[]> {
    return this._realtime.onValueChanges('timeline/messages/', 'id', limitToLast(100));
  }

  getMessagesSearch(search: string): Observable<any[]> {
    return this._realtime.onValueChanges('timeline/messages/', 'id', orderByChild('displayNameSearch'), startAt(search.toLowerCase()));
  }

  getFollowingMessages(): Observable<any[]> {
    return this._realtime.onValueChanges('timeline/follow/messages/' + this.auth.user?.uid, 'id', limitToLast(30));
  }

  getMessagesSavedAsync(): Observable<any[]> {
    return this._realtime.onValueChanges('timeline/saved/' + this.auth.user?.uid, 'id');
  }

  getComments(postId: string) {
    return this._realtime.onValueChanges('timeline/comments/' + postId, 'id');
  }

  getFollowUser() {
    return this._realtime.get(`timeline/follow/following/${this.auth.user?.uid}`);
  }

  deleteComment(postId: string, commentId: string) {
    return this._realtime.delete(`timeline/comments/${postId}/${commentId}/`).catch();
  }

  async setFavorite(post: any) {
    const postId = post.id;
    const postUid = post.uid;
    const path = `timeline/favorites/messages/${postId}/${this.auth.user?.uid}`;
    const snapshot = await this._realtime.get(path);
    if (!snapshot.exists()) {
      return this.createFavorite(postId).then(async () => {

        if (postUid != this.auth.user?.uid) {
          const existFavorite = await this._alertsService.checkFavoriteAlert(postUid, postId);
          if (!existFavorite) {
            this._alertsService.createAlert('favorite', postUid, {
              postId: postId,
              favoriteId: this.auth.user?.uid,
              type: 'favorite',
              image: post.images ? post.images[0].imageURL : null,
              ptText: this.languageService.getTextByLang('favoritou','pt'),
              enText: this.languageService.getTextByLang('favoritou','en'),
              icon: 'favorite'
            });
          }
        }
      })
    } else {
      return this.removeFavorite(postId).catch();
    }
  }

  async createFavorite(postId: string) {
    return this._realtime.set(`timeline/favorites/messages/${postId}/${this.auth.user?.uid}`, {
      uid: this.auth.user?.uid, displayName: this.auth.user?.displayName, time: new Date().valueOf()
    })
  }

  async removeFavorite(postId: string) {
    return this._realtime.delete(`timeline/favorites/messages/${postId}/${this.auth.user?.uid}`);
  }

  getTotalFavorites(postId: string) {
    return this._realtime.onValueChanges(`timeline/favorites/messages/${postId}`);
  }


  async repost(postId: string, repostText: string, repost: any) {
    const uid = this.auth.user?.uid;
    const displayName = this.auth.user?.displayName;
    const id = this._realtime.createId();

    await this._realtime.set('timeline/messages/' + id, {
      id,
      uid,
      displayName,
      displayNameSearch: displayName?.toLowerCase(),
      photoURL: this.auth.user?.photoURL,
      postText: repostText,
      dateTime: new Date().getTime(),
      repost: repost,
      repostId: repost.id
    }).then(() => {
      if (repost.uid != uid) {
        this._alertsService.createAlert('repost', repost.uid as string, {
          postId: id,
          repostId: repost.id,
          type: 'repost',
          ptText: this.languageService.getTextByLang('repostou','pt') ,
          enText: this.languageService.getTextByLang('repostou','en') ,
          icon: 'repeat_outlined',
          text: repostText,
          image: repost.images ? repost.images[0] : null,
        })
      }

      const repostData = {
        id,
        uid,
        displayName: displayName!,
        displayNameSearch: displayName?.toLowerCase(),
        photoURL: this.auth.user?.photoURL,
      }
      this._realtime.set(`timeline/repost-by-post/${repost.id}/${id}`, repostData);
      this._realtime.set(`timeline/repost-by-user/${this.auth.user?.uid}/${repost.id}`, repostData);
    });
  }

  async setCommentFavorite(postId: string, commentId: string) {
    const path = `timeline/favorites/comments/${postId}/${commentId}/${this.auth.user?.uid}`;
    const snapshot = await this._realtime.get(path);
    if (!snapshot.exists()) {
      console.log('xxx');
      return this.createFavoriteComment(postId, commentId).catch(r=> console.log(r));
    } else {
      return this.removeCommentFavorite(postId, commentId).catch();
    }
  }

  async createFavoriteComment(postId: string, commentId: string) {
    return this._realtime.set(`timeline/favorites/comments/${postId}/${commentId}/${this.auth.user?.uid}`, {
      uid: this.auth.user?.uid, displayName: this.auth.user?.displayName, time: new Date().valueOf()
    });
  }

  async removeCommentFavorite(postId: string, commentId: string) {
    return this._realtime.delete(`timeline/favorites/comments/${postId}/${commentId}/${this.auth.user?.uid}`);
  }

  async getTotalCommentFavorites(postId: string, commentId: string) {
    console.log(`timeline/favorites/comments/${postId}/${commentId}/`)
    const total = await this._realtime.get(`timeline/favorites/comments/${postId}/${commentId}/`);

    return total.size;
  }

  async getTotalCommentFavoritesByUser(postId: string, commentId: string) {
    const total = await this._realtime.get(`timeline/favorites/comments/${postId}/${commentId}/${this.auth.user?.uid}`);
    return total.size;
  }
}
