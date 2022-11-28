import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormAlertDialogComponent} from "../../post-form/form-alert-dialog/form-alert-dialog.component";

@Component({
  selector: 'app-timeline-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  @Output() close = new EventEmitter();
  @Input() isDialog = false;


  constructor(
    private _dialogRef: MatDialogRef<FormAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isDialog = data;

  }

  closeDialog() {
    this._dialogRef.close();
  }
}
