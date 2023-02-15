import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TimelineService} from "../services/timeline.service";
import {ImageViewComponent} from "../../image-view/image-view.component";
import {AlbumService} from "../../shared/services/album/album.service";


@Component({
  selector: 'app-timeline-album-view',
  templateUrl: './timeline-album-view.component.html',
  styleUrls: ['./timeline-album-view.component.scss']
})
export class TimelineAlbumViewComponent implements OnInit {
  images: any
  albumId = '';
  postUId = '';
  info: any;

  constructor(public timelineService: TimelineService,
              private _dialog: MatDialog,
              private _route: ActivatedRoute,
              private _router: Router,
              private _albumService: AlbumService
  ) {
    this.albumId = this._route.snapshot.paramMap.get('albumId') as string;
    this.postUId = this._route.snapshot.paramMap.get('uid') as string;
    this.timelineService.auth.authState.subscribe(user => {
      if (_router.url.includes('photos')) {
        this.info = {
          photoURL: user?.photoURL,
          displayName: user?.displayName
        }
        this.getPhotos()
      } else {
        this.getAlbum();
      }
    })

  }

  openAlert(data: any) {
    const dialogRef = this._dialog.open(ImageViewComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['no-padding', 'bg-color'],
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
    });
  }

  getPhotos() {
    this._albumService.getPhotos().then(snapshot => {
      if (snapshot.exists())
        this.images = Object.values(snapshot.val());
    });
  }

  getAlbum() {
    this._albumService.getAlbum(this.albumId, this.postUId).then(snapshot => {
      if (snapshot.exists()) {
        this.images = Object.values(snapshot.val()?.list);
        this.info = snapshot.val().info;
      }
    });
  }

  ngOnInit(): void {
  }

}
