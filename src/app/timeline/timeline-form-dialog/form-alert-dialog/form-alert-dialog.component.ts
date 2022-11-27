import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-alert-dialog',
  templateUrl: './form-alert-dialog.component.html',
  styleUrls: ['./form-alert-dialog.component.scss']
})
export class FormAlertDialogComponent implements OnInit {
  alertText = '';

  constructor(private _dialogRef: MatDialogRef<FormAlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.alertText = data.text;
  }

  ngOnInit(): void {
  }

}
