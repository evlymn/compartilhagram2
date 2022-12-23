import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MessagesService} from "../messages.service";
import {StorageService} from "../../shared/services/firebase/storage/storage.service";

@Component({
  selector: 'app-messages-form-bottom-sheet',
  templateUrl: './messages-form-bottom-sheet.component.html',
  styleUrls: ['./messages-form-bottom-sheet.component.scss']
})
export class MessagesFormBottomSheetComponent implements OnInit {
  @ViewChild('file') file!: ElementRef;
  postText = '';
  isMobile = true;
  image: any = {};
  sendingPost = false;

  constructor(private _bottomSheetRef: MatBottomSheetRef<MessagesFormBottomSheetComponent>,
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

  async fileChangeEvent(e: any) {
    this.image.image64 = await this._storageService.fileToBase64(e.target.files[0]) as string
    this.image.file = e.target.files[0];
    this.file.nativeElement.value = '';
  }

  deleteImg() {
    this.image = {};
  }
}
