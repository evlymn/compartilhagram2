import { Injectable } from '@angular/core';
import {ImageViewComponent} from "./image-view.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ImageViewService {

  constructor(   private _dialog: MatDialog,) { }

  openImageViewDialog(data: any) {
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

}
