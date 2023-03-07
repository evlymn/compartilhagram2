import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditableTextAreaComponent} from './editable-text-area.component';


@NgModule({
  declarations: [
    EditableTextAreaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [EditableTextAreaComponent]
})
export class EditableTextAreaModule {
}
