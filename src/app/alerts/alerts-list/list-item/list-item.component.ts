import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() alert: any;

  isExchangeagram = false;

  constructor() {
    this.isExchangeagram = window.location.host == 'exchangeagram.app';
  }

  ngOnInit(): void {
  }

}
