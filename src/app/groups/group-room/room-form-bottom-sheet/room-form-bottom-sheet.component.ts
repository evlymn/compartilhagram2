import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-room-form-bottom-sheet',
  templateUrl: './room-form-bottom-sheet.component.html',
  styleUrls: ['./room-form-bottom-sheet.component.scss']
})
export class RoomFormBottomSheetComponent implements OnInit {
  postText = '';

  constructor(private _bottomSheetRef: MatBottomSheetRef<RoomFormBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  createMessage() {
    this._bottomSheetRef.dismiss(this.postText);
  }

  ngOnInit(): void {
  }

}
