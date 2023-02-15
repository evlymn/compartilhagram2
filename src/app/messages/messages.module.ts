import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from './messages.component';
import {MessagesRoomsComponent} from './messages-rooms/messages-rooms.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
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
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AlertsModule} from "../alerts/alerts.module";
import {MatRippleModule} from "@angular/material/core";
import {TitleComponent} from "../shared/components/title/title.component";

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesRoomsComponent,
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
        MatDialogModule,
        MatProgressSpinnerModule,
        AlertsModule,
        MatRippleModule,
        TitleComponent
    ], providers: [

    MatBottomSheetModule,

  ]
})
export class MessagesModule {
}
