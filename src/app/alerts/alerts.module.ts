import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsComponent} from './alerts.component';
import {AlertsListComponent} from './alerts-list/alerts-list.component';
import {ListItemComponent} from './alerts-list/list-item/list-item.component';
import {MatIconModule} from "@angular/material/icon";
import {AlertsRoutingModule} from "./alerts-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TimeAgoPipe} from "../shared/pipes/time-ago/time-ago-pipe";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        TimeAgoPipe,
        AlertsComponent,
        AlertsListComponent,
        ListItemComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        AlertsRoutingModule
    ],
    exports: [
        TimeAgoPipe
    ],
    providers: [
        MatSnackBarModule,
        MatBottomSheetModule,
        MatDialogModule,
    ]
})
export class AlertsModule {
}
