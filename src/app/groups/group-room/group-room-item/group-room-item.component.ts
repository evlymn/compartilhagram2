import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-room-item',
  templateUrl: './group-room-item.component.html',
  styleUrls: ['./group-room-item.component.scss']
})
export class GroupRoomItemComponent implements OnInit {
  @Input() item: any;
  @Input() loggedUid = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
