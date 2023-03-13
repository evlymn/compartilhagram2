import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {StorageService} from "../../services/firebase/storage/storage.service";
import {MessagesService} from "../../../messages/messages.service";
import {ImageSet} from "../../interfaces/image-set";

@Component({
  selector: 'app-text-image-form-bottom-sheet',
  templateUrl: './text-image-form-bottom-sheet.component.html',
  styleUrls: ['./text-image-form-bottom-sheet.component.scss']
})
export class TextImageFormBottomSheetComponent {
  postText = '';
  isMobile = true;
  image: any = {};
  sendingPost = false;
  images: ImageSet[] = [];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<TextImageFormBottomSheetComponent>,
    private _storageService: StorageService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public messageService: MessagesService) {
  }

  ngOnInit(): void {
  }

  createMessage() {
    this._bottomSheetRef.dismiss({
      postText: this.postText,
      file: this.image.file
    });
  }

  deleteImg() {
    this.image = {};
  }

  textChange(e: any) {
    this.postText = e;
  }

  async getFileOnChange(e: any) {
    if (e.length > 0) {
      this.image.image64 = e[0].image64
      this.image.file = e[0].file
    }
  }
}
