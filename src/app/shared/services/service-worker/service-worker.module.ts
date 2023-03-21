import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceWorkerDialogComponent} from './service-worker-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [
    ServiceWorkerDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatBottomSheetModule
  ]
})
export class ServiceWorkerModule {
}
