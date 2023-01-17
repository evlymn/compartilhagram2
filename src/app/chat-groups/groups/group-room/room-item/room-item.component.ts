import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input() item: any;
  @Input() loggedUid = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
