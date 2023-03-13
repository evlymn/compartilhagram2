import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextImageFormBottomSheetComponent} from './text-image-form-bottom-sheet.component';
import {TextFieldModule} from "@angular/cdk/text-field";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EditableTextAreaModule} from "../editable-text-area/editable-text-area.module";

@NgModule({
  declarations: [
    TextImageFormBottomSheetComponent
  ],
    imports: [
        CommonModule,
        TextFieldModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        EditableTextAreaModule
    ],
  exports: [
    TextImageFormBottomSheetComponent
  ]
})
export class TextImageFormBottomSheetModule {
}
