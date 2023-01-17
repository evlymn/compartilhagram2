import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChatGroupsService} from "../services/chat-groups.service";

@Component({

  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  tabSelectedIndex = 0;
  groupDescription = '';
  createGroupPanelOpened = false;
  publicGroup = false;
  groupName = '';
  groups: any;
  getPublic = false;
  publicGroups: any;


  constructor(
    public chatGroups: ChatGroupsService,
    private _snackBar: MatSnackBar) {
    this.chatGroups.auth.authState.subscribe(user => {
      this.getPublicGroups()
      this.getGroupsByUser(user?.uid as string);
    })
  }

  toggleIndex(index: number) {
    this.tabSelectedIndex = index;
  }

  createGroup() {
    const groupData = {
      name: this.groupName,
      public: this.publicGroup,
      description: this.groupDescription,
    }
    this.chatGroups.groupsService.createGroup(groupData).then(() => {
      const message = this.chatGroups.languageService.getText('grupocriado');
      const action = this.chatGroups.languageService.getText('fechar');
      this._snackBar.open(message, action, {
        verticalPosition: 'top',
        duration: 1000
      });
    });
    this.createGroupPanelOpened = false;
  }

  getGroupsByUser(userId: string) {
    this.groups = this.chatGroups.groupsService.getGroupsByUser(userId);
  }

  getPublicGroups() {
    this.publicGroups = this.chatGroups.groupsService.getPublicGroups();
  }

  onPanelCreateGroupCollapse() {
    this.groupName = '';
    this.groupDescription = '';
  }

  ngOnInit(): void {
  }

}
