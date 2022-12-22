import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ProfileRoutingModule} from "./profile-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatDialogModule} from "@angular/material/dialog";
import {TimelineModule} from "../timeline/timeline.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ProfileRoutingModule,
    TimelineModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FormsModule
  ],
  providers: [
    MatSnackBarModule,
    MatBottomSheetModule,
    MatDialogModule,
  ]
})
export class ProfileModule {
}
