import {Component, Input, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {GroupsService} from "../groups.service";
import {ActivatedRoute} from "@angular/router";
import {
  TextImageFormBottomSheetComponent
} from "../../shared/components/text-image-form-bottom-sheet/text-image-form-bottom-sheet.component";
import {StorageService} from "../../shared/services/firebase/storage/storage.service";

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

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _groupService: GroupsService,
    private _route: ActivatedRoute,
    private _storageService: StorageService,
  ) {
    this.groupId = this._route.snapshot.paramMap.get('groupId') as string;
    this.hostId = this._groupService.auth.user?.uid as string;
    this._groupService.auth.authState.subscribe(() => {
      this.getGroups();
      this.getGroupInfo().catch();
    })
  }

  openBottomSheet(): void {

    const d = this._bottomSheet.open(TextImageFormBottomSheetComponent, {
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

  createGroupMessage(message: any) {

    const id = this._groupService.realtimeService.createId();
    const groupData = {
      id,
      groupId: this.groupId,
      message: message.postText,
      uid: this._groupService.auth.user?.uid,
      hasImage: !!message.file,
      photoURL: this._groupService.auth.user?.photoURL,
      displayName: this._groupService.auth.user?.displayName,
      dateTime: new Date().getTime()
    }

    // const groupData = {
    //   message,
    //   uid: this._groupService.auth.user?.uid,
    //   grupoId: this.groupId,
    //   displayName: this._groupService.auth.user?.displayName,
    //   photoURL: this._groupService.auth.user?.photoURL,
    // }
    this._groupService.createGroupMessage(this.groupId, groupData).then(async  => {
        if (message.file) {
          this._storageService.resizeImage(
            {maxSize: 2500, file: message.file}
          ).then(blob => {
            const file = this._storageService.blobToFile(blob, message.file.name, {
              type: message.file.type,
              lastModified: message.file.lastModified
            });
            const path = `groups/messages/${this.groupId}/${id}/${message.file.name}`
            this._storageService.uploadBytes(path, file, {
              customMetadata: {}
            }).then(async () => {
              const downloadURL = await this._storageService.getDownloadURL(path);
               this._groupService.updateMessage(this.groupId, id as string, {
                imageURL: downloadURL,
              }).catch()
            });
          });
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
