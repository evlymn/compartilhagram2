import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-timeline-form-bottom-sheet',
  templateUrl: './timeline-form-bottom-sheet.component.html',
  styleUrls: ['./timeline-form-bottom-sheet.component.scss']
})
export class TimelineFormBottomSheetComponent {
  @Output() close = new EventEmitter();
  @Input() isDialog = false;
  constructor(private _bottomSheetRef: MatBottomSheetRef<TimelineFormBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.isDialog = data;
  }

  closeDialog() {
    this._bottomSheetRef.dismiss();
  }
}
