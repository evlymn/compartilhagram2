import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LanguageService} from "../language/language.service";
@Component({
  selector: 'app-service-worker-dialog',
  template: `
      <style>

          .form-button {
              background-color: #622947;
              color: whitesmoke !important;
              width: 46%;
              border-width: 0;
          }

          .actions {
              width: 100%;
              display: flex;
              justify-content: space-between;
          }

          .component {
              padding: 10px;
          }

          .component > div {
              text-align: center;
              color: white;
              margin-bottom: 10px;
          }

          h3 {
              text-align: center;
              color: white;
          }
      </style>
      <div class="component">
          <h3 mat-dialog-title>{{languageService.getText("umaatualizaoestadisponivel") }}</h3>
          <div mat-dialog-actions class="actions">
              <button class="form-button" (click)="dialogRef.close()" mat-button
                      color="primary">{{languageService.getText("cancelar") }}</button>
              <button class="form-button" (click)="dialogRef.close(true)" mat-button color="accent"
                      cdkFocusInitial>{{languageService.getText("atualizar") }}
              </button>
          </div>
      </div>
  `,
})
export class ServiceWorkerDialogComponent {
  constructor(public languageService: LanguageService,
              public dialogRef: MatDialogRef<ServiceWorkerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

}
