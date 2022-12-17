import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WindowService} from "../shared/services/window/window.service";

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent {
  url = '';
  isMobile = this.windowService.sizes.isMobile as boolean;

  constructor(private _dialogRef: MatDialogRef<ImageViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private windowService: WindowService) {

    this.url = data;

  }

}
