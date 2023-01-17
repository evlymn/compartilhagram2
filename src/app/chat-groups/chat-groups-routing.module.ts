import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsComponent} from "./groups/groups.component";
// import {GroupRoomComponent} from "../groups/group-room/group-room.component";

const routes: Routes = [{
  path: "", component: GroupsComponent
}
// ,{
//   path: ":groupId",
//   component: GroupRoomComponent
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatGroupsRoutingModule {
}
