import {Component, OnInit} from '@angular/core';
import {GroupsService} from "./groups.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private _groupService: GroupsService,
              private _snackBar: MatSnackBar) {
    this._groupService.auth.authState.subscribe(user => {

      this.getPublicGroups()

      this.getGroupsByUser(user?.uid as string);

    })
  }


  toggleIndex(index: number) {
    this.tabSelectedIndex = index;
  }


  ngOnInit(): void {
  }

  createGroup() {
    console.log(this.publicGroup);
    const grouData = {
      name: this.groupName,
      public: this.publicGroup,
      description: this.groupDescription,
    }
    this._groupService.createGroup(grouData).then(() => {
      this._snackBar.open('Grupo criado', 'fechar', {
        verticalPosition: 'top',
        duration: 1000
      });
    });
    this.createGroupPanelOpened = false;
  }

  getGroupsByUser(userId: string) {
    this.groups = this._groupService.getGroupsByUser(userId);
    // this._groupService.getGroupsByUser(userId).subscribe(d => {
    //   console.log(d)
    // })
    // console.log(this.groups);
  }

  getPublicGroups() {
    this.publicGroups = this._groupService.getPublicGroups();
  }

  onPanelCreateGroupCollapse() {
    this.groupName = '';
    this.groupDescription = '';
    // this.createGroupPanelOpened = !this.createGroupPanelOpened;
  }
}
