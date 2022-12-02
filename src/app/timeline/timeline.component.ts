import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WindowService} from "../shared/services/window/window.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineService} from "./timeline.service";
import {NotificationService} from "../shared/services/notification/notification.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit {
  showScrollTo = false;
  isMobile = this.windowService.sizes.isMobile;
  urlFragment;
  postId = '';
  postItems: any;
  isSearchUser = false;
  post: any;
  searchUserPanelOpened = false;
  searchText = '';
  isSavedPost = false;
  totalSavedPost = 0;

  constructor(public windowService: WindowService,
              private _dialog: MatDialog,
              private _route: ActivatedRoute,
              private _router: Router,
              private _timelineService: TimelineService,
              private _notificationService: NotificationService) {
    this.urlFragment = this._route.snapshot.fragment;
    this.postId = this._route.snapshot.paramMap.get('id') as string;
    this._timelineService.auth.authState.subscribe(() => {

      if (this.checkIsSearchRoute()) {
        this.openSearchPanel();
      }

      this._notificationService.observable().subscribe(notice => {
        if (notice.key == 'toggleSearchPanel') {
          if (!this.checkIsHomeRoute()) {
            this._router.navigate(['/home/search']).catch()
          } else {
            this.openSearchPanel();
          }
        }

        // if (notice.key == 'searchUser') {
        //   const search = notice.value.trim().length > 0 ? notice.value.trim() : null
        //   this.isSearchUser = search ?? false;
        //   this.getPosts(search).catch();
        // }
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

  async getPosts(search?: string) {
    this.isSearchUser = false;
    if (search) {
      this.isSearchUser = true;
      this.postItems = this._timelineService.getMessagesSearch(search)
    } else {
      if (this._router.url.includes('saved')) {
        this.isSavedPost = true;
        this.postItems = this._timelineService.getMessagesSavedAsync()
      } else if (this._router.url.includes('following')) {
        this.postItems = this._timelineService.getFollowingMessages();
      } else
        this.postItems = this._timelineService.getMessagesAsync();
    }
  }

  // async getPostsHeader(type: string, search?: string) {
  //   this.selectedIndex = 0;
  //   this.isSearchUser = false;
  //   switch (type) {
  //     case 'search':
  //       this.postItems = this._timelineService.getMessagesSearch(search as string);
  //       break;
  //     case 'saved':
  //       this.postItems = this._timelineService.getMessagesSavedAsync();
  //       break;
  //     case 'following':
  //       console.log('dddd')
  //       this.postItems = this._timelineService.getFollowingMessages();
  //       break;
  //     default:
  //       this.postItems = this._timelineService.getMessagesAsync();
  //   }
  // }


  ngOnInit(): void {

  }

  scrollTo() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   if (this.urlFragment) {
    //     this._router.navigate(['/principal'], {fragment: this.urlFragment}).then(() => {
    //     })
    //   }
    // }, 1000)
  }

  onPanelSearchUserCollapse() {

  }

  searchUser() {
    if (this.searchText.trim().length > 0)
      this.getPosts(this.searchText.trim()).catch();

    this.searchUserPanelOpened =false;
  }

}
