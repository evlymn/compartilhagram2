import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from "./messages.service";
import {ActivatedRoute} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {StorageService} from "../shared/services/firebase/storage/storage.service";
import {
  TextImageFormBottomSheetComponent
} from "../shared/components/text-image-form-bottom-sheet/text-image-form-bottom-sheet.component";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @ViewChild('footer') footer!: ElementRef;
  hostId = '';
  guestId = ''
  room = '';
  guest: any;
  host: any;
  rooms: any;

  constructor(
    private _messagesService: MessagesService,
    private _storageService: StorageService,
    private _route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet) {
    this.guestId = this._route.snapshot.paramMap.get('userId') as string;

    this._messagesService.auth.authState.subscribe(async user => {
      this.host = user;
      this.guest = await this._messagesService.getUserInfo(this.guestId);
      this.hostId = user?.uid as string;
      this.room = await this._messagesService.checkRoom(user, this.guest);
      this.getMessages(this.room);
    })
  }

  getMessages(room: string) {
    this.rooms = this._messagesService.getMessages(room)
  }

  async createMessage(message: any) {
    const id = this._messagesService.realtimeService.createId();
    const messageData = {
      id,
      roomId: this.room,
      message: message.postText,
      uid: this.host.uid,
      hasImage: !!message.file,
      photoURL: this.host.photoURL,
      displayName: this.host.displayName,
      dateTime: new Date().getTime()
    }
    this._messagesService.createMessage(this.room, messageData).then(async () => {
      if (message.file) {
        this._storageService.resizeImage(
          {maxSize: 2500, file: message.file}
        ).then(blob => {
          const file = this._storageService.blobToFile(blob, message.file.name, {
            type: message.file.type,
            lastModified: message.file.lastModified
          });
          const path = `chat/messages/${this.room}/${id}/${message.file.name}`
          this._storageService.uploadBytes(path, file, {
            customMetadata: {}
          }).then(async () => {
            const downloadURL = await this._storageService.getDownloadURL(path);
             this._messagesService.updateMessage(this.room, id as string, {
              imageURL: downloadURL,
            }).catch()
          });
        });
      }

      this.updateRoom();
      this.footer.nativeElement.scrollIntoView(true);
    })
  }

  updateRoom() {
    this._messagesService.updateRooms(this.hostId, this.guestId);
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(TextImageFormBottomSheetComponent, {
      panelClass: 'bottom-sheet-class'
    });
    bottomSheetRef.afterDismissed().subscribe(result => {
      this.createMessage(result).catch();
    })
  }

  ngOnInit(): void {
  }

  openForm() {

  }
}
