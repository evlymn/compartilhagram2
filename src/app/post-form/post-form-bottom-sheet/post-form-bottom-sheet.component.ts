import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-timeline-form-bottom-sheet',
  templateUrl: './post-form-bottom-sheet.component.html',
  styleUrls: ['./post-form-bottom-sheet.component.scss']
})
export class PostFormBottomSheetComponent {
  @Output() close = new EventEmitter();
  @Input() isDialog = false;
  constructor(private _bottomSheetRef: MatBottomSheetRef<PostFormBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.isDialog = data;
  }

  closeDialog() {
    this._bottomSheetRef.dismiss();
  }
}
