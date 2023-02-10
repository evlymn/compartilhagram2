import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUploadItemComponent} from './image-upload-item.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ImageUploadItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ImageUploadItemComponent]
})
export class ImageUploadItemModule {
}
