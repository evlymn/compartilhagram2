import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsComponent} from './groups.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {GroupsListComponent} from './groups-list/groups-list.component';
import {RouterLink} from "@angular/router";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {GroupRoomComponent} from './group-room/group-room.component';
import {RoomItemComponent} from './group-room/room-item/room-item.component';
import {RoomFormBottomSheetComponent} from './group-room/room-form-bottom-sheet/room-form-bottom-sheet.component';
import {GroupsRoutingModule} from "./groups-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatRippleModule} from "@angular/material/core";
import {AlertsModule} from "../alerts/alerts.module";


@NgModule({
  declarations: [
    GroupsComponent,
    GroupsListComponent,
    GroupRoomComponent,
    RoomItemComponent,
    RoomFormBottomSheetComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    MatSnackBarModule,
    GroupsRoutingModule,
    MatRippleModule,
    AlertsModule
  ],
  providers: [
    MatSnackBarModule,
    // MatBottomSheetModule,
    // MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroupsModule {
}
