import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsComponent} from "./groups.component";
import {GroupRoomComponent} from "./group-room/group-room.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";


let routes: Routes;
routes = [
  {
    path: "", component: GroupsComponent
  }, {
    path: ":groupId",
    component: GroupRoomComponent
  },]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatSnackBarModule
  ],
  exports: [
    RouterModule,
    MatSnackBarModule
  ],
  providers: [MatSnackBarModule]
})
export class GroupsRoutingModule {
}
