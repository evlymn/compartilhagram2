import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';

 import {FormAlertDialogComponent} from "./form-alert-dialog/form-alert-dialog.component";

import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {WindowService} from "../../shared/services/window/window.service";
import {StorageService} from "../../shared/services/firebase/storage/storage.service";
import {ImageSet} from "./image-set";
import {TimelineService} from "../timeline.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../shared/services/notification/notification.service";

@Component({
  selector: 'app-timeline-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
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

  constructor(public windowService: WindowService,
              private _storageService: StorageService,
              private _dialog: MatDialog,
             private timelineService: TimelineService,
              private _notificationService: NotificationService,
              private _dialogRef: MatDialogRef<FormAlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.isDialog = data;
    this.windowService.getSizes.subscribe(size => {
      this.isMobile = size.isMobile;
    });

    this.timelineService.auth.authState.subscribe(() => {
      this.getAlbums();
    })

  }

  getAlbums() {
    this.timelineService.getAlbums().then(d => {
      if (d.exists()) {
        this.albums = Object.values(d.val());
      }
    })
  }

  async savePost() {
    if(this.postText.trim().length>0 || this.images.length>0) {
      const postId = this.timelineService.createId() as string;
      this.sendingPost = true;
      let albumData: any;
      if (this.images.length > 0) {
        this.album = this.albumControl.value as string;
        if (this.album && this.album.length > 0) {
          albumData = this.albums?.find((d: { album: string; }) => d.album == this.album);
          if (!albumData) {
            albumData = await this.timelineService.createAlbum(this.album) as { id: string, album: string };
          }
        }
      }


      let total = 0;
      this.images = await this.timelineService.savePost(postId, this.images, this.postText, albumData);
      if (this.images.length > 0) {
        for (let i = 0; i < this.images.length; i++) {
          const sub = this.images[i].uploadTask?.subscribe(s => {
              this.images[i].progress = s.progress;
              if (s.progress == 100) {
                console.log('fim do upload ' + i.toString());
                sub?.unsubscribe();
                total += s.progress;
                if (total == this.images.length * 100) {
                  this.timelineService.repostToFollowers(postId);
                  this.openAlert({text: "Post enviado!", action: 'closeForm'});
                }
              }
            }
          )
        }
      } else {
        this.timelineService.repostToFollowers(postId);
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


  openAlert(data: any) {
    const dialogRef = this._dialog.open(FormAlertDialogComponent, {
      width: '100%',
      height: '100px',
      panelClass: 'bg-color',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'closeForm') {
        this._dialogRef.close();
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
