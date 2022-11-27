import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessagesRoomsComponent} from "./messages-rooms/messages-rooms.component";
import {MessagesComponent} from "./messages.component";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";

let routes: Routes;
routes = [
  {
    path: "", component: MessagesRoomsComponent
  }, {
    path: ":userId",
    component: MessagesComponent
  }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    MatBottomSheetModule
  ],
  exports: [RouterModule,

    MatBottomSheetModule],

  providers: [MatBottomSheetModule]

})
export class MessagesRoutingModule {
}
