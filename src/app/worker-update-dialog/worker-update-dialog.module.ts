import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerUpdateDialogComponent } from './worker-update-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    WorkerUpdateDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class WorkerUpdateDialogModule { }
