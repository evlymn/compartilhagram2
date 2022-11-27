import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-messages-rooms',
  templateUrl: './messages-rooms.component.html',
  styleUrls: ['./messages-rooms.component.scss']
})
export class MessagesRoomsComponent implements OnInit {

  rooms: any;

  constructor(private _messagesService: MessagesService) {
    this._messagesService.auth.authState.subscribe(async user => {
      this.getRooms(user?.uid as string).catch();
    })
  }

  getKey(item: any) {
    return Object.keys(item)[0];

  }


  async getRooms(userId: string) {
    const snapshot = await this._messagesService.getRooms(userId);
    if (snapshot.exists())
      this.rooms = Object.values(snapshot.val());
  }

  ngOnInit(): void {
  }

}
