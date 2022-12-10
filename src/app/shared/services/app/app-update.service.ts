import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {MatDialog} from "@angular/material/dialog";
import {WorkerUpdateDialogComponent} from "../../../worker-update-dialog/worker-update-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(private updates: SwUpdate, private _dialog: MatDialog,) {
    this.updates.versionUpdates.subscribe(event => {
      if (this.updates.isEnabled)
        if (event.type == 'VERSION_READY')
          this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    // const header = 'App Update available';
    // const message = 'Choose Ok to update';
    // const action = this.doAppUpdate;
    // const caller = this;

    const dialogRef = this._dialog.open(WorkerUpdateDialogComponent, {
      // maxWidth: '400px',
      // maxHeight: '100px',
      height: '150px',
      width: '300px',
      // panelClass: ['no-padding', 'bg-color'],
      // data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.doAppUpdate();
      }
      // console.log('The dialog was closed');
    });

    // Use MatDialog or ionicframework's AlertController or similar
    // presentAlert(header, message, action, caller);
  }

  doAppUpdate() {
    if (this.updates.isEnabled)
      this.updates.activateUpdate().then(() => document.location.reload());
  }
}
