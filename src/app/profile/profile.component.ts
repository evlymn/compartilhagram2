import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "./profile.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {HomeService} from "../home/home.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  totalPosts = 0;
  totalImages = 0;
  userId = '';
  profile: any;
  totalReposts = 0;
  isFollowed = false;
  buttonDisabled = false;
  panelOpenState = true;




  constructor(public auth: AuthenticationService,
              private _profileService: ProfileService,
              private _route: ActivatedRoute,
              public homeService: HomeService) {
    this.userId = this._route.snapshot.paramMap.get('userId') as string;
    this._profileService.auth.authState.subscribe(() => {
      this.getProfile().catch();
      this.getPostByUser().catch();
      this.getPhotosByUser().catch();
      this.getRepostsByUser().catch();
      this.getIsFollowed().catch();
    })
  }

  async getProfile() {
    const snapshot = await this._profileService.getProfile(this.userId);
    this.profile = snapshot.val();
  }

  async getIsFollowed() {
    this.isFollowed = await this._profileService.getIsFollowed(this.userId);
  }

  async getPostByUser() {
    const snapshot = await this._profileService.getPostByUser(this.userId);
    this.totalPosts = snapshot.size;
  }

  async getPhotosByUser() {
    const snapshot = await this._profileService.getPhotosByUser(this.userId);
    this.totalImages = snapshot.size;
  }

  async getRepostsByUser() {
    const snapshot = await this._profileService.getRepostsByUser(this.userId);
    this.totalReposts = snapshot.size;
  }

  async followUser(followId: string) {
    this.buttonDisabled = true;
    if (this.isFollowed) {
      await this._profileService.unfollowUser(followId);
    } else {
      await this._profileService.followUser(followId);
    }
    await this.getIsFollowed();
    this.buttonDisabled = false;
  }


  ngOnInit(): void {
  }


}
