import { Injectable } from '@angular/core';
import {SwUpdate} from "@angular/service-worker";
import {MatDialog} from "@angular/material/dialog";
import {ServiceWorkerDialogComponent} from "./service-worker-dialog.component";
@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {
  constructor(
    private updates: SwUpdate,
    private _dialog: MatDialog,
    ) {
    this.updates.versionUpdates.subscribe(event => {
      if (this.updates.isEnabled)
        if (event.type == 'VERSION_READY')
          this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    const dialogRef = this._dialog.open(ServiceWorkerDialogComponent, {
      height: '100px',
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doAppUpdate();
      }
    });
  }

  doAppUpdate() {
    if (this.updates.isEnabled)
      this.updates.activateUpdate().then(() => document.location.reload());
  }
}
