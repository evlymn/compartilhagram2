import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-timeline-badge-info-bottom-sheet',
  templateUrl: './timeline-badge-info-bottom-sheet.component.html',
  styleUrls: ['./timeline-badge-info-bottom-sheet.component.scss']
})
export class TimelineBadgeInfoBottomSheetComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<TimelineBadgeInfoBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(): void {
  }

}
