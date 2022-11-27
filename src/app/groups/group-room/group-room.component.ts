import {Component, Input, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {RoomFormBottomSheetComponent} from "./room-form-bottom-sheet/room-form-bottom-sheet.component";
import {GroupsService} from "../groups.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-group-room',
  templateUrl: './group-room.component.html',
  styleUrls: ['./group-room.component.scss']
})
export class GroupRoomComponent implements OnInit {
  groups: any;
  @Input() hostId = '';
  groupId = '';
  group: any;

  constructor(private _bottomSheet: MatBottomSheet,
              private _groupService: GroupsService,
              private _route: ActivatedRoute,) {
    this.groupId = this._route.snapshot.paramMap.get('groupId') as string;
    this.hostId = this._groupService.auth.user?.uid as string;
    this._groupService.auth.authState.subscribe(() => {
      this.getGroups();
      this.getGroupInfo().catch();
    })
  }

  openBottomSheet(): void {

    const d = this._bottomSheet.open(RoomFormBottomSheetComponent, {
      panelClass: 'bottom-sheet-class'
    });
    d.afterDismissed().subscribe(result => {
      this.createGroupMessage(result);
    })
  }

  getGroups() {
    this.groups = this._groupService.getGroupMessages(this.groupId);
  }

  async getGroupInfo() {
    const snapshot = await this._groupService.getGroupInfo(this.groupId);
    this.group = snapshot.val();
  }

  createGroupMessage(message: string) {
    const groupData = {
      message,
      uid: this._groupService.auth.user?.uid,
      grupoId: this.groupId,
      displayName: this._groupService.auth.user?.displayName,
      photoURL: this._groupService.auth.user?.photoURL,
    }
    this._groupService.createGroupMessage(this.groupId, groupData).catch();
  }

  ngOnInit(): void {
  }

}
