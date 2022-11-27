import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from './messages.component';
import {MessagesRoomsComponent} from './messages-rooms/messages-rooms.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MessagesFormBottomSheetComponent} from './messages-form-bottom-sheet/messages-form-bottom-sheet.component';
import {TextFieldModule} from "@angular/cdk/text-field";
import {FormsModule} from "@angular/forms";
import {MessagesItemComponent} from './messages-item/messages-item.component';
import {RouterLink} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessagesRoutingModule} from "./messages-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesRoomsComponent,
    MessagesFormBottomSheetComponent,
    MessagesItemComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
    FormsModule,
    RouterLink,
    MessagesRoutingModule,
    MatBottomSheetModule,
    MatDialogModule
  ], providers: [

    MatBottomSheetModule,

  ]
})
export class MessagesModule {
}
