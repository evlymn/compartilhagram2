import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewRoutingModule } from './image-view-routing.module';
import { ImageViewComponent } from './image-view.component';
 import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {PinchZoomModule} from "./pinchzoom/pinch-zoom.module";


@NgModule({
  declarations: [
    ImageViewComponent
  ],
  imports: [
    CommonModule,
    ImageViewRoutingModule,
    PinchZoomModule,
    MatDialogModule,
    MatIconModule,
  ], exports: [ImageViewComponent]
})
export class ImageViewModule { }
