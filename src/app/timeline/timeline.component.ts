import {Component, OnDestroy, OnInit} from '@angular/core';
import {WindowService} from "../shared/services/window/window.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineService} from "./timeline.service";
import {NotificationService} from "../shared/services/notification/notification.service";
import {limitToLast} from "@angular/fire/database";
import {PostData} from "../post-form/interfaces/post-data";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  showScrollTo = false;
  isMobile = this.windowService.sizes.isMobile;
  urlFragment;
  postId = '';
  isSearchUser = false;
  post: any;
  searchUserPanelOpened = false;
  searchText = '';
  firstPosts: any[] = [];
  postItems: PostData[] = [];
  newPostItems: any[] = [];
  localPosts = false;


  constructor(public windowService: WindowService,
              private _dialog: MatDialog,
              private _route: ActivatedRoute,
              private _router: Router,
              public timelineService: TimelineService,
              private _notificationService: NotificationService) {
    this.searchText = '';
    this.urlFragment = this._route.snapshot.fragment;
    this.localPosts = !!this._route.snapshot.paramMap.get('local');
    this.postId = this._route.snapshot.paramMap.get('id') as string;
    this.timelineService.auth.authState.subscribe(() => {
      this.searchText = this._route.snapshot.paramMap.get('search') as string
      this.getPosts(this.searchText).catch();
      if (this.checkIsSearchRoute()) {
        this.openSearchPanel();
      }

      this._notificationService.observable().subscribe(n => {
        if (n.key == 'postEdited') {
        }

        if (n.key == 'postDeleted') {
        }

        if (n.key == 'postSaved') {
        }

        if (n.key == 'toggleSearchPanel') {
          if (!this.checkIsHomeRoute()) {
            this._router.navigate(['/home/search']).catch()
          } else {
            this.openSearchPanel();
          }
        }
        if (n.key == 'searchUser') {
          this.timelineService.searchUserText = n.value.trim();
          this.timelineService.isSearchUser = true;
          this.getPosts(this.searchText).catch();
        }
      })
      if (!this.isSearchUser)
        this.getPosts().catch();
    })
    this.windowService.getSizes.subscribe(size => {
      this.isMobile = size.isMobile;
    })
  }


  openSearchPanel() {
    this.searchUserPanelOpened = !this.searchUserPanelOpened
    if (this.searchUserPanelOpened) {
      window.scrollTo(0, 0);
    }
  }

  checkIsSearchRoute() {
    const arr = this._router.url.split('/');
    return arr[arr.length - 1] == 'search'

  }

  checkIsHomeRoute() {
    const arr = this._router.url.split('/');
    return arr[arr.length - 1] == 'search' || arr[arr.length - 1] == 'home' || arr[arr.length - 1] == 'following'

  }

  showNewPost() {
    this.postItems.push(...this.newPostItems);
    this.newPostItems = [];
  }

  async getPosts(search?: string) {
    this.isSearchUser = !!search;
    console.log(this.timelineService.isSearchUser);
    const snapshot = await this.timelineService.getMessages(limitToLast(100))

    if (!this.timelineService.isSearchUser) {
      snapshot.forEach(p => {
        this.firstPosts.push(p.val());
      })

      this.postItems.push(...this.firstPosts);
    }

    if (search) {
      this.isSearchUser = true;
      this.timelineService.getMessagesSearch(search).subscribe((s: PostData[]) => {
        this.postItems = s.filter(d => d.displayNameSearch.includes(search.toLowerCase()));
      })
    } else if (this._router.url.includes('following')) {
      this.timelineService.getFollowingMessages().subscribe(s => {
        this.postItems = s;
      })
    } else if (this._router.url.includes('saved')) {
      this.timelineService.getMessagesSavedAsync().subscribe(s => {
        this.postItems = s;
      })
    } else {
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


  scrollTo() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }

  searchUser() {
    if (this.searchText.trim().length > 0)
      this.getPosts(this.searchText.trim()).catch();

    this.searchUserPanelOpened = false;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }


  replaceTranslate() {
    return this.timelineService.languageService.getText('usuariopostounadaainda').replace('####', this.searchText)
  }
}
