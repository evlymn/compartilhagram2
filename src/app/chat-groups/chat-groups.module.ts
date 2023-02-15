import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatGroupsRoutingModule} from './chat-groups-routing.module';
import {GroupsComponent} from "./groups/groups.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {GroupsListComponent} from "./groups/groups-list/groups-list.component";
import {ChatComponent} from "./chats/chat.component";
import {ChatRoomsComponent} from "./chats/chat-rooms/chat-rooms.component";
import {ChatItemComponent} from "./chats/chat-item/chat-item.component";
import { CgFormBottomSheetComponent } from './cg-form-bottom-sheet/cg-form-bottom-sheet.component';
import {GroupRoomComponent} from "./groups/group-room/group-room.component";
import {RoomItemComponent} from "./groups/group-room/room-item/room-item.component";
import {AlertsModule} from "../alerts/alerts.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRippleModule} from "@angular/material/core";

@NgModule({
  declarations: [
    GroupsComponent,
    GroupsListComponent,
    ChatComponent,
    ChatRoomsComponent,
    ChatItemComponent,
    CgFormBottomSheetComponent,
    GroupRoomComponent,
   RoomItemComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ChatGroupsRoutingModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatTabsModule,
        MatListModule,
        MatExpansionModule,
        MatInputModule,
        MatIconModule,
        AlertsModule,
        MatProgressSpinnerModule,
        MatRippleModule,
    ]
})
export class ChatGroupsModule {
}
