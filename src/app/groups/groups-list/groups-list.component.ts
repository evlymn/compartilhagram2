import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  @Input() item: any;

  constructor() {
  }

  ngOnInit(): void {
  }


}
