import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent {
  url = '';
  constructor(private _dialogRef: MatDialogRef<ImageViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.url = data;

  }

}
