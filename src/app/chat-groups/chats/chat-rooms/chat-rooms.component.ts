import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../../messages/messages.service";

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {

  rooms: any;

  constructor(public messagesService: MessagesService) {
    this.messagesService.auth.authState.subscribe(async user => {
      this.getRooms(user?.uid as string).catch();
    })
  }

  getKey(item: any) {
    return Object.keys(item)[0];
  }

  sortRooms(rooms: any[]) {
    return rooms.sort((a: any, b: any) => {
      if (a.dateTime < b.dateTime) return -1
      else if (a.dateTime > b.dateTime) return 1
      else return 0
    })
  }

  async getRooms(userId: string) {
    this.rooms = this.messagesService.getRooms(userId);

  }


  ngOnInit(): void {
  }

}
