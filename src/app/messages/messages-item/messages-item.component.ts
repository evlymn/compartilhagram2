import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.scss']
})
export class MessagesItemComponent implements OnInit {
  @Input() item: any;
  @Input() loggedUid = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
