import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TimelineService} from "../timeline.service";
import {ImageViewComponent} from "../../image-view/image-view.component";


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

  constructor(private _timelineService: TimelineService,
              private _dialog: MatDialog,
              private _route: ActivatedRoute,
              private _router: Router,
  ) {
    this.albumId = this._route.snapshot.paramMap.get('albumId') as string;
    this.postUId = this._route.snapshot.paramMap.get('uid') as string;
    this._timelineService.auth.authState.subscribe(user => {
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
      console.log('The dialog was closed');
    });
  }

  getPhotos() {
    this._timelineService.getPhotos().then(snapshot => {
      if (snapshot.exists())
        this.images = Object.values(snapshot.val());
    });
  }

  getAlbum() {
    this._timelineService.getAlbum(this.albumId, this.postUId).then(snapshot => {
      if (snapshot.exists()) {
        this.images = Object.values(snapshot.val()?.list);
        this.info = snapshot.val().info;
      }
    });
  }

  ngOnInit(): void {
  }

}
