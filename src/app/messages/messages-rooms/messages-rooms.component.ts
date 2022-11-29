import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-messages-rooms',
  templateUrl: './messages-rooms.component.html',
  styleUrls: ['./messages-rooms.component.scss']
})
export class MessagesRoomsComponent implements OnInit {

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
    // if (snapshot.exists()) {
    //     console.log(snapshot.val())
    // snapshot.forEach(roomSnapshot => {
    //   const dataValues = Object.values(roomSnapshot.val())
    //   const data = dataValues.map((d: any) => {
    //     return {
    //       displayName: d.displayName,
    //       photoURL: d.photoURL,
    //       room: d.room,
    //       uid: d.uid,
    //       dateTime: d.dateTime
    //     }
    //   })[0]
    //   this.rooms.push(data)
    //   // console.log(data);
    // })
    // console.log(snapshot.val())
    //
    // console.log(objValues)
    // const rooms = [];
    //   objValues.forEach((d: any) => {
    //   const dd = Object.values(d);
    //   rooms.push({
    //     displayName
    //   })
    //   console.log(d['-NI2d_viusS7LpF10Q82'].displayName)
    // })
  }


  ngOnInit(): void {
  }

}
