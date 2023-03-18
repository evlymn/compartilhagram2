import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "./profile.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";
import {HomeService} from "../home/home.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WindowService} from "../shared/services/window/window.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileUp') fileUp!: ElementRef;
  totalPosts = 0;
  totalImages = 0;
  userId = '';
  profile: any;
  totalReposts = 0;
  isFollowed = false;
  buttonDisabled = false;
  file!: File;
  panelOpenState = true;
  isEditAvatar = false;
  isEditName = false;

  saving = false;
  isMobile = this._windowService.sizes.isMobile;

  constructor(
    public auth: AuthenticationService,
    private _profileService: ProfileService,
    private _route: ActivatedRoute,
    public homeService: HomeService,
    private _snackBar: MatSnackBar,
    private _windowService: WindowService
  ) {
    this._windowService.getSizes.subscribe(s=>{
      this.isMobile = s.isMobile;
    })
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


  async save() {
    this.saving = true;
    let url = '';
    if (this.file) {
      await this._profileService.storage.uploadBytes('users/' + this.auth.user?.uid + '/avatar/' + this.file.name, this.file)
      url = await this._profileService.storage.getDownloadURL('users/' + this.auth.user?.uid + '/avatar/' + this.file.name);
    }

    this.auth.updateProfile({
      displayName: this.profile.displayName,
      photoURL: url.length > 0 ? url : this.profile.photoURL
    }).then(d => {

      this.finish();
      this._snackBar.open('Atualizado', 'ok', {
        duration: 2000,
        verticalPosition: 'top',
      })
    })

  }

  async fileChangeEvent(e: any) {
    this.isEditAvatar = true;
    this.profile.photoURL = await this._profileService.storage.fileToBase64(e.target.files[0]);
    const blob = await this._profileService.storage.resizeImage({file: e.target.files[0], maxSize: 2000});
    this.file = await this._profileService.storage.blobToFile(blob, e.target.files[0].name, {
      type: e.target.files[0].type,
      lastModified: e.target.files[0].lastModified
    });

  }

  editName(e: any) {
    this.isEditName = true;
  }

  cancelEdit() {
    this.finish();
  }

  finish() {
    this.saving = false;
    this.isEditAvatar = false;
    this.isEditName = false;
    this.getProfile().catch();
  }

}
