import {Component, OnDestroy, OnInit} from '@angular/core';
import {WindowService} from "../shared/services/window/window.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineService} from "./timeline.service";
import {NotificationService} from "../shared/services/notification/notification.service";
import {limitToLast} from "@angular/fire/database";
import {PostData} from "../post-form/interfaces/post-data";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  isMobile = this.windowService.sizes.isMobile;
  isSearchUser = false;
  post: any;
  searchText: string | null = '';
  postItems: PostData[] = [];
  newPostItems: any[] = [];
  isFollowing = false;
  isSaved = false;
  isProfile =false;
  authStateSubscription: Subscription;
  windowServiceSubscription: Subscription;
  messagesSearchSubscription!: Subscription;
  messagesSavedSubscription!: Subscription;
  messagesFollowingSubscription!: Subscription;

  constructor(public windowService: WindowService,
              private _route: ActivatedRoute,
              private _router: Router,
              public timelineService: TimelineService,
              private _notificationService: NotificationService) {


    this.isFollowing = this._router.url.includes('following');
    this.isSaved = this._router.url.includes('saved');
    this.isProfile =  this._router.url.includes('profile');
    this.searchText = this._route.snapshot.paramMap.get('search');


    this.onMessageUpdate();
    this.authStateSubscription = this.timelineService.auth.authState.subscribe(() => {
      this.getPosts(this.searchText).catch();
    })
    this.windowServiceSubscription = this.windowService.getSizes.subscribe(size => {
      this.isMobile = size.isMobile;
    })
  }

  onMessageUpdate() {
    this.timelineService.onMessageUpdate(snapshot => {
      const message = snapshot.val()
      if (this.timelineService.auth.user?.uid == message.uid) {
        this.timelineService.updateReposts(message);
      }
    })
  }

  showNewPost() {
    this.postItems.push(...this.newPostItems);
    this.newPostItems = [];
  }

  async getPosts(search?: string | null) {
    this.isSearchUser = !!search;
    if (!search && !this.isFollowing && !this.isSaved) {
      const snapshot = await this.timelineService.getMessages(limitToLast(100));
      snapshot.forEach(p => {
        this.postItems.push(p.val());
      })
    }
    if (search) {
      this.messagesSearchSubscription = this.timelineService.getMessagesSearch(search.trim()).subscribe((s: PostData[]) => {
        this.postItems = s.filter(d => d.displayNameSearch.includes(search.trim().toLowerCase()));
      })
    } else if (this.isFollowing) {
      this.messagesFollowingSubscription = this.timelineService.getFollowingMessages().subscribe(s => {
        this.postItems = s;
      })
    } else if (this.isSaved) {
      this.messagesSavedSubscription = this.timelineService.getMessagesSavedAsync().subscribe(s => {
        this.postItems = s;
      })
    } else if (this.isProfile) {
      const id = this._route.snapshot.paramMap.get('userId') as string;
      this.messagesSavedSubscription = this.timelineService.getMessagesByUser(id).subscribe(s => {
        this.postItems = s;
      })
    }else {
      this.timelineService.getMessagesOnChildAdded(snapshot => {
        if (!this.postItems.some(p => p.id == snapshot.val().id)) {
          this.newPostItems.push(snapshot.val());
          if (snapshot.val().uid == this.timelineService.auth.user?.uid) {
            this.postItems.push(snapshot.val());
            this.newPostItems = this.newPostItems.filter(p => p.id != snapshot.val().id);
          }
        }
      }, limitToLast(100))

      this.timelineService.getMessageOnChanged(snapshot => {
        const index = this.postItems.findIndex(p => p.id == snapshot.val().id);
        this.postItems[index] = snapshot.val();
      })

      this.timelineService.getMessageOnRemoved(snapshot => {
        const index = this.postItems.findIndex(p => p.id == snapshot.val().id);
        if (snapshot.val().uid == this.timelineService.auth.user?.uid) {
          this.postItems.splice(index, 1);
        }
      })
    }
  }

  ngOnInit(): void {
  }

  replaceTranslate() {
    return this.timelineService.languageService.getText('usuariopostounadaainda').replace('####', this.searchText)
  }

  ngOnDestroy(): void {
    this.authStateSubscription?.unsubscribe();
    this.windowServiceSubscription?.unsubscribe();
    this.messagesSearchSubscription?.unsubscribe();
    this.messagesSavedSubscription?.unsubscribe();
    this.messagesFollowingSubscription?.unsubscribe();
  }
}
