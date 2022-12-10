import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-worker-update-dialog',
  templateUrl: './worker-update-dialog.component.html',
  styleUrls: ['./worker-update-dialog.component.scss']
})
export class WorkerUpdateDialogComponent {
  constructor(public dialogRef: MatDialogRef<WorkerUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }
}
