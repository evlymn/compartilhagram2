import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from "./messages.service";
import {ActivatedRoute} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

import {MessagesFormBottomSheetComponent} from "./messages-form-bottom-sheet/messages-form-bottom-sheet.component";

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

  constructor(private _messagesService: MessagesService,
              private _route: ActivatedRoute, private _bottomSheet: MatBottomSheet) {
    this.guestId = this._route.snapshot.paramMap.get('userId') as string;

    this._messagesService.auth.authState.subscribe(async user => {
      this.host = user;
      this.guest = await this._messagesService.getUserInfo(this.guestId);
      this.hostId = user?.uid as string;
      this.room = await this._messagesService.checkRoom(user, this.guest);
      console.log(this.room);
      this.getMessages(this.room);
    })
  }

  getMessages(room: string) {
    this.rooms = this._messagesService.getMessages(room)
  }

  async createMessage(message: string) {
    const messageData = {
      message,
      uid: this.host.uid,
      photoURL: this.host.photoURL,
      displayName: this.host.displayName,
      dateTime: new Date().getTime()
    }
    this._messagesService.createMessage(this.room, messageData).then(() => {
      this.updateRoom();
      this.footer.nativeElement.scrollIntoView(true);
    })
  }

  updateRoom() {
    this._messagesService.updateRooms(this.hostId, this.guestId);
  }

  openBottomSheet(): void {
    const d = this._bottomSheet.open(MessagesFormBottomSheetComponent, {
      panelClass: 'bottom-sheet-class'
    });
    d.afterDismissed().subscribe(result => {

      this.createMessage(result).catch();
    })
  }

  ngOnInit(): void {
  }

  openForm() {

  }
}
