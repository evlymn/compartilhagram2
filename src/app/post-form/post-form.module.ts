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
import {MatExpansionModule} from "@angular/material/expansion";
import { PostFormActionsComponent } from './post-form-actions/post-form-actions.component';
import {PostFormBottomSheetComponent} from "./post-form-bottom-sheet/post-form-bottom-sheet.component";
import {MatRippleModule} from "@angular/material/core";
import { PostFormConfirmSnackbarComponent } from './post-form-confirm-snackbar/post-form-confirm-snackbar.component';
import {RouterLink} from "@angular/router";
import {EditableTextAreaModule} from "../shared/components/editable-text-area/editable-text-area.module";
import {MatMenuModule} from "@angular/material/menu";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import { PostFormImagesGridComponent } from './post-form-images-grid/post-form-images-grid.component';


@NgModule({
  declarations: [
    PostFormComponent,
    FormAlertDialogComponent,
    PostFormActionsComponent,
    PostFormBottomSheetComponent,
    PostFormConfirmSnackbarComponent,
    PostFormImagesGridComponent,
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
    MatIconModule,
    MatExpansionModule,
    MatRippleModule,
    RouterLink,
    EditableTextAreaModule,
    MatMenuModule,
    PickerModule
  ],
  exports: [PostFormComponent,
    FormAlertDialogComponent,
    PostFormImagesGridComponent]

})
export class PostFormModule {
}
