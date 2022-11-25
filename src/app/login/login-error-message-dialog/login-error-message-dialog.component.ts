import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login-error-message-dialog',
  templateUrl: './login-error-message-dialog.component.html',
  styleUrls: ['./login-error-message-dialog.component.scss']
})
export class LoginErrorMessageDialogComponent implements OnInit {
  message = '';

  constructor(public dialogRef: MatDialogRef<LoginErrorMessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data;
  }

  ngOnInit(): void {
  }

}
