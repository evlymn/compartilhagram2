import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostFormService} from "../post-form.service";

@Component({
  selector: 'app-form-alert-dialog',
  templateUrl: './form-alert-dialog.component.html',
  styleUrls: ['./form-alert-dialog.component.scss']
})
export class FormAlertDialogComponent {

  alertText = '';

  constructor(private _dialogRef: MatDialogRef<FormAlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public postFormService: PostFormService) {
    this.alertText = data.text;
  }

  ngOnInit(): void {
  }

}
