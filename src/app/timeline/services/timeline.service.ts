import {Injectable} from '@angular/core';
import {AuthenticationService} from "../../shared/services/firebase/authentication/authentication.service";
import {DataSnapshot, limitToLast, orderByChild, QueryConstraint, startAt,} from "@angular/fire/database";
import {Observable} from "rxjs";
import {AlertsService} from "../../alerts/alerts.service";
import {LanguageService} from "../../shared/services/language/language.service";
import {ImageViewService} from "../../image-view/image-view.service";
import {FavoriteService} from "../../shared/services/favorite/favorite.service";
import {ActivatedRoute} from "@angular/router";
import {TimelinePostDeleteService} from "./timeline-post-delete.service";
import {TimelineDatabaseService} from "./timeline-database.service";
import {TimelineDatabaseTriggersService} from "./timeline-database-triggers.service";


@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor(
    private _realtime: TimelineDatabaseService,
    public dbTriggers: TimelineDatabaseTriggersService,
    public auth: AuthenticationService,
    private _alertsService: AlertsService,
    public languageService: LanguageService,
    private _imageView: ImageViewService,
    private _favoriteService: FavoriteService,
    private _route: ActivatedRoute,
    private _timelinePostDeleteService: TimelinePostDeleteService
  ) {

  }

  updateReposts(post: any) {
    const postId = post.id, repostId = post.repostId, postText = post.text
    this._realtime.get('timeline/repost-by-post/' + postId).then(snapshot => {
      snapshot.forEach(p => {
        this._realtime.update('timeline/messages/' + p.val().id + '/repost/', {
          postText
        }).catch();
        //TODO: fix this algorithm
        this._realtime.update(`timeline/repost-by-post/${postId}/${p.val().id}`, {
          postText
        }).catch();
        this._realtime.update(`timeline/repost-by-user/${this.auth.user?.uid}/` + p.val().id, {
          postText
        }).catch();
      })
    })
  }

  getMessages(...queryConstraints: QueryConstraint[]) {
    return this._realtime.get('timeline/messages/', ...queryConstraints)
  }

  createId() {
    return this._realtime.createId();
  }

  public get authState() {
    return this.auth.authState;
  }

  async getPost(id: string): Promise<any> {
    const snapshot = await this._realtime.get(`timeline/messages/${id}`);
    if (snapshot.exists())
      return snapshot.val();
  }


  async deletePost(post: any) {
    if(post.isComment){
       this.deleteComment(post.postId, post.id).catch();
    }
    this._timelinePostDeleteService.deletePost(post.id).catch();
  }


  getReposts(postId: string) {
    return this._realtime.onValueChanges(`timeline/repost-by-post/${postId}/`);
  }

  async updatePost(postId: string, data: any, parentId: string, isComment: boolean) {
    data.bad_word = false;
    data.updateDate = new Date().getTime();
    let path = 'timeline/messages/' + postId;
    if (isComment) {
      path = `timeline/comments/${parentId}/${postId}`
    }
    return this._realtime.update(path, data);
  }

  getLast3Comments(postId: string) {
    this._realtime.get(`timeline/comments/${postId}`, limitToLast(3)).then(snapshot => {
      const comments: any[] = [];
      snapshot.forEach(comment => {
        comments.push({
            text: comment.val().text,
            time: comment.val().dateTime,
            displayName: comment.val().displayName,
            photoURL: comment.val().photoURL,
          }
        )
      })
      this._realtime.update(`timeline/messages/${postId}`, {
        comments
      }).catch(reason => console.log(reason));
    })
  }

  async createComment(postId: string, commentText: string, hasImages: boolean = false, refId: string) {
    const commentId = this._realtime.createId();
    const path = `timeline/comments/${postId}/${commentId}`;
    return this._realtime.set(path, {
      text: commentText,
      refId,
      hasImages,
      dateTime: new Date().valueOf(),
      displayName: this.auth.user?.displayName,
      id: commentId,
      uid: this.auth.user?.uid,
      photoURL: this.auth.user?.photoURL,
      bad_word: false,
      isComment: true,
      postId
    }).then(() => {
      if (!refId || refId == postId)
        this.getLast3Comments(postId)
      return commentId
    })
  }

  async updateComment(postId: string, commentId: string, data: any) {
    const path = `timeline/comments/${postId}/${commentId}`;
    return this._realtime.update(path, data).then(()=> this.getLast3Comments(postId));
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

  getMessagesByUser(userId: string): Observable<any[]> {
    return this._realtime.onValueChanges('timeline/messages-by-user/' + userId, 'id', limitToLast(10));
  }

  getMessagesAsync(): Observable<any[]> {
    return this._realtime.onValueChanges('timeline/messages/', 'id', limitToLast(100));
  }

  getMessagesSearch(search: string): Observable<any[]> {
    return this._realtime.onValueChanges('timeline/messages/',
      'id',
      orderByChild('displayNameSearch'),
      startAt(search.toLowerCase()), limitToLast(30));
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
    return this._realtime.delete(`timeline/comments/${postId}/${commentId}/`).then(() => {
      this.removeCommentFavorite(postId, commentId).catch();
      this.getLast3Comments(postId)
    });
  }

  openImageViewDialog(data: any) {
    this._imageView.openImageViewDialog(data);
  }

  async setFavorite(post: any) {
    const comm_mess = !!post.isComment ? 'comments/' + post.postId : 'messages';
    this._favoriteService.setFavorite(`timeline/favorites/${comm_mess}/${post.id}/${this.auth.user?.uid}`, {
        uid: this.auth.user?.uid,
        displayName: this.auth.user?.displayName,
        time: new Date().valueOf()
      }
    ).then(result => {
      if (result == 'create') {
        this._alertsService.createAlert('favorite', post.id, {
          postId: post.id,
          favoriteId: this.auth.user?.uid,
          type: 'favorite',
          image: post.images ? post.images[0].imageURL : null,
          ptText: this.languageService.getTextByLang('favoritou', 'pt'),
          enText: this.languageService.getTextByLang('favoritou', 'en'),
          icon: 'favorite'
        });
      }
    })
  }

  getTotalFavorites(post: any) {
    const comm_mess = !!post.isComment ? 'comments/' + post.postId : 'messages';
    const postId = post.id
    return this._favoriteService.getTotalFavoritesOnChanges(`timeline/favorites/${comm_mess}/${postId}`);
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
      text: repostText,
      dateTime: new Date().getTime(),
      repost: repost,
      repostId: repost.id,
      isRepost: true
    }).then(() => {
      if (repost.uid != uid) {
        this._alertsService.createAlert('repost', repost.uid as string, {
          postId: id,
          repostId: repost.id,
          type: 'repost',
          ptText: this.languageService.getTextByLang('repostou', 'pt'),
          enText: this.languageService.getTextByLang('repostou', 'en'),
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
    return this._favoriteService.setFavorite(path, {
      uid: this.auth.user?.uid,
      displayName: this.auth.user?.displayName,
      time: new Date().valueOf()
    });
  }

  async removeCommentFavorite(postId: string, commentId: string) {
    return this._favoriteService.removeFavorite(`timeline/favorites/comments/${postId}/${commentId}/${this.auth.user?.uid}`);
  }

  async getTotalCommentFavorites(postId: string, commentId: string) {
    return await this._favoriteService.getTotalFavorites(`timeline/favorites/comments/${postId}/${commentId}/`);
  }

  async getTotalCommentFavoritesByUser(postId: string, commentId: string) {
    return await this._favoriteService.getTotalFavorites(`timeline/favorites/comments/${postId}/${commentId}/${this.auth.user?.uid}`);
  }


}
