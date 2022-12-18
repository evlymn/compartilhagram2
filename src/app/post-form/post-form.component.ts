import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

import {map, Observable, startWith} from "rxjs";
import {WindowService} from "../shared/services/window/window.service";
import {StorageService} from "../shared/services/firebase/storage/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../shared/services/notification/notification.service";
import {ImageSet} from "./interfaces/image-set";
import {PostFormService} from "./post-form.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, AfterViewInit {


  @Output() close = new EventEmitter();
  @Input() isDialog = false;
  albumControl = new FormControl('');
  postText = '';
  album?: string = undefined;
  isMobile = false;
  images: ImageSet[] = [];
  sendingPost = false;
  albums: any;
  albumsFiltered!: Observable<string[]>;
  // panelPost = true;
  // panelSearch = false;
  searchText = '';

  constructor(
    public windowService: WindowService,
    private _storageService: StorageService,
    private _dialog: MatDialog,
    public postFormService: PostFormService,
    private _notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {

    this._notificationService.observable().subscribe(n => {
      if (n.key == 'showSearchPanel') {
        this.postFormService.panelPost = !this.postFormService.panelPost;
        this.postFormService.panelSearch = !this.postFormService.panelSearch;
      }
    })
    this.windowService.getSizes.subscribe(size => {
      this.isMobile = size.isMobile;
    });

    this.postFormService.auth.authState.subscribe(() => {
      this.getAlbums();
    })

  }

  getAlbums() {
    this.postFormService.getAlbums().then(d => {
      if (d.exists()) {
        this.albums = Object.values(d.val());
      }
    })
  }

  async savePost() {
    if (this.postText.trim().length > 0 || this.images.length > 0) {
      const postId = this.postFormService.createId() as string;
      this.sendingPost = true;
      let albumData: any;
      if (this.images.length > 0) {
        this.album = this.albumControl.value as string;
        if (this.album && this.album.length > 0) {
          albumData = this.albums?.find((d: { album: string; }) => d.album == this.album);
          if (!albumData) {
            albumData = await this.postFormService.createAlbum(this.album) as { id: string, album: string };
          }
        }
      }


      let total = 0;
      this.images = await this.postFormService.savePost(postId, this.images, this.postText, albumData);

      if (this.images.length > 0) {
        const postImages: string[] = [];
        for (let i = 0; i < this.images.length; i++) {

          const sub = this.images[i].uploadTask?.subscribe(async s => {

              this.images[i].progress = s.progress;
              if (s.progress == 100) {
                console.log('fim do upload ' + i.toString());
                sub?.unsubscribe();
                total += s.progress;
                if (total == this.images.length * 100) {
                  this.postFormService.repostToFollowers(postId);
                  this.cleanForm();
                  this._notificationService.next('postSaved', postId).catch();
                  this.openAlert({
                    text: this.postFormService.languageService.getText('postenviado'),
                    action: 'closeForm'
                  });
                }
              }
            }
          )
        }
      } else {
        this.postFormService.repostToFollowers(postId);
        this.cleanForm();
        this._notificationService.next('postSaved', postId).catch();
        this.openAlert({text: this.postFormService.languageService.getText('postenviado'), action: 'closeForm'});
      }
    }
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.albums?.filter((a: any) => a.album.toLowerCase().includes(filterValue)).map((d: any) => d.album);
  }

  ngOnInit(): void {

    this.isMobile = this.windowService.sizes.isMobile;
    this.albumsFiltered = this.albumControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  async fileChangeEvent(e: any) {

    if (e.target.files.length + this.images.length > 6) {
      this.openAlert({text: "Escolha no máximo 6 imagens."});
      return;
    }
    for (let i = 0; i < e.target.files.length; i++) {
      if (this.images.length > 5) return
      const image = await this._storageService.fileToBase64(e.target.files[i]) as string
      this.images.push({image64: image, file: e.target.files[i]});
    }
  }

  openSnack() {
    // if (!this.isMobile)
    this._snackBar.open('Post enviado', 'fechar', {
      verticalPosition: 'top',
      duration: 2000
    });
  }

  cleanForm() {

    this.sendingPost = false;
    this.postText = '';
    this.images = [];
    this.close.emit();
    this.openSnack();
  }

  openAlert(data: any) {

    // if (!this.isMobile)
    //   return
    // const dialogRef = this._dialog.open(FormAlertDialogComponent, {
    //   width: '100%',
    //   height: '100px',
    //   panelClass: 'bg-color',
    //   data: data
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == 'closeForm') {
    //     this.close.next('closeForm')
    //   }
    //   console.log('The dialog was closed');
    // });
  }

  deleteImg(i: number) {
    this.images.splice(i, 1);
  }

  deleteAutocompleteText() {
    this.albumControl.setValue('');
  }

  searchUser() {
    if (this.searchText.trim().length > 0) {
      this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate(['/home/search/', this.searchText]).catch()
      }).then(() => {
        if (this.isDialog)
          this.close.emit()
      })
    }
  }

  cancelSearch() {
    this.postFormService.panelPost = !this.postFormService.panelPost;
    this.postFormService.panelSearch = !this.postFormService.panelSearch;
    this.searchText = '';
    if(this.isDialog) {
      this.close.emit()
      return;
    }
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this._router.navigate(['/home']).catch();
    });
  }

  ngAfterViewInit(): void {

  }
}
