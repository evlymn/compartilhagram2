import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-messages-form-bottom-sheet',
  templateUrl: './messages-form-bottom-sheet.component.html',
  styleUrls: ['./messages-form-bottom-sheet.component.scss']
})
export class MessagesFormBottomSheetComponent implements OnInit {
  postText = '';

  constructor(private _bottomSheetRef: MatBottomSheetRef<MessagesFormBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public messageService: MessagesService) {
  }

  ngOnInit(): void {
  }

  createMessage() {
    this._bottomSheetRef.dismiss(this.postText);
  }
}
