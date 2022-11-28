import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostFormComponent} from './post-form.component';
import {FormAlertDialogComponent} from './form-alert-dialog/form-alert-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PostFormComponent,
    FormAlertDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [PostFormComponent,
    FormAlertDialogComponent]

})
export class PostFormModule {
}