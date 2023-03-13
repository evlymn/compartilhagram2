import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditableTextAreaComponent} from './editable-text-area.component';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import { EmojiPickerDialogComponent } from './emoji-picker-dialog/emoji-picker-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ImagesGridComponent} from "./images-grid/images-grid.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    EditableTextAreaComponent,
    EmojiPickerDialogComponent,
    ImagesGridComponent
  ],
  imports: [
    CommonModule,
    PickerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [EditableTextAreaComponent]
})
export class EditableTextAreaModule {
}
