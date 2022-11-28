import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

import {map, Observable, startWith} from "rxjs";
import {WindowService} from "../shared/services/window/window.service";
import {StorageService} from "../shared/services/firebase/storage/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../shared/services/notification/notification.service";
import {FormAlertDialogComponent} from "./form-alert-dialog/form-alert-dialog.component";
import {ImageSet} from "./image-set";
import {PostFormService} from "./post-form.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
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

  constructor(
    public windowService: WindowService,
    private _storageService: StorageService,
    private _dialog: MatDialog,
    private postFormService: PostFormService,
    private _notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {

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
        for (let i = 0; i < this.images.length; i++) {
          const sub = this.images[i].uploadTask?.subscribe(s => {
              this.images[i].progress = s.progress;
              if (s.progress == 100) {
                console.log('fim do upload ' + i.toString());
                sub?.unsubscribe();
                total += s.progress;
                if (total == this.images.length * 100) {
                  this.postFormService.repostToFollowers(postId);
                  this.cleanForm();
                  this.openAlert({text: "Post enviado!", action: 'closeForm'});
                }
              }
            }
          )
        }
      } else {
        this.postFormService.repostToFollowers(postId);
        this.cleanForm();
        this.openAlert({text: "Post enviado!", action: 'closeForm'});
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
    if(!this.isMobile)
    this._snackBar.open('Post enviado', 'fechar', {
      verticalPosition: 'top',
      duration: 2000
    });
  }
  cleanForm() {
    this.sendingPost = false;
    this.postText = '';
    this.images = [];
    this.openSnack();
  }

  openAlert(data: any) {

    if(!this.isMobile)
      return
    const dialogRef = this._dialog.open(FormAlertDialogComponent, {
      width: '100%',
      height: '100px',
      panelClass: 'bg-color',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'closeForm') {
        this.close.next('closeForm')
       }
      console.log('The dialog was closed');
    });
  }

  deleteImg(i: number) {
    this.images.splice(i, 1);
  }

  deleteAutocompleteText() {
    this.albumControl.setValue('');
  }
}
