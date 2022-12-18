import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline.component';
import {PostImagesGridComponent} from "./timeline-post/post-images-grid/post-images-grid.component";
import {PostCommentsComponent} from "./timeline-post/post-comments/post-comments.component";
import {PostHeaderComponent} from "./timeline-post/post-header/post-header.component";
import {PostFooterComponent} from "./timeline-post/post-footer/post-footer.component";
import {PostBodyComponent} from "./timeline-post/post-body/post-body.component";
import {TimelinePostComponent} from "./timeline-post/timeline-post.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  TimelineBadgeInfoBottomSheetComponent
} from "./timeline-badge-info-bottom-sheet/timeline-badge-info-bottom-sheet.component";
import {CommentsItemComponent} from "./timeline-post/post-comments/comments-item/comments-item.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {TextFieldModule} from "@angular/cdk/text-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatMenuModule} from "@angular/material/menu";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {TimelinePostDetailComponent} from "./timeline-post-detail/timeline-post-detail.component";
import {TimelineFloatingMenuComponent} from "./timeline-floating-menu/timeline-floating-menu.component";
import {MatInputModule} from "@angular/material/input";
import {FormDialogComponent} from "./timeline-form-dialog/form-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {TimelineAlbumViewComponent} from "./timeline-album-view/timeline-album-view.component";
import {AlertsModule} from "../alerts/alerts.module";
import {PostFormModule} from "../post-form/post-form.module";
import {MatRippleModule} from "@angular/material/core";
import { PostLastCommentsComponent } from './timeline-post/post-last-comments/post-last-comments.component';
import { LastCommentsItemComponent } from './timeline-post/post-last-comments/last-comments-item/last-comments-item.component';
import { TimelineFormBottomSheetComponent } from './timeline-form-bottom-sheet/timeline-form-bottom-sheet.component';


@NgModule({
  declarations: [
    TimelineComponent,
    PostCommentsComponent,
    PostImagesGridComponent,
    PostHeaderComponent,
    PostFooterComponent,
    PostBodyComponent,
    CommentsItemComponent,
    TimelinePostComponent,
    TimelineBadgeInfoBottomSheetComponent,
    TimelinePostDetailComponent,
    TimelineFloatingMenuComponent,

    FormDialogComponent,
    TimelineAlbumViewComponent,
    PostLastCommentsComponent,
    LastCommentsItemComponent,
    TimelineFormBottomSheetComponent,
  ],
    imports: [
        CommonModule,
        TimelineRoutingModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTabsModule,
        MatDividerModule,
        MatExpansionModule,
        MatButtonModule,
        TextFieldModule,
        FormsModule,
        MatChipsModule,
        MatMenuModule,
        MatBottomSheetModule,
        MatInputModule,
        MatDialogModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AlertsModule,
        PostFormModule,
        MatRippleModule
    ],
  exports:[ TimelineComponent]

})
export class TimelineModule { }
