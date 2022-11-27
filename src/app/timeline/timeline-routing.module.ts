import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TimelineComponent} from "./timeline.component";
import {TimelinePostDetailComponent} from "./timeline-post-detail/timeline-post-detail.component";
import {TimelineAlbumViewComponent} from "./timeline-album-view/timeline-album-view.component";

const routes: Routes = [
  {
    path: "", component: TimelineComponent
  },
  {
    path: "search", component: TimelineComponent
  },
  {
    path: "details/:id/:index",
    component: TimelinePostDetailComponent
  } ,
  {
    path: "photos",
    component: TimelineAlbumViewComponent
  },
  {
    path: "album/:albumId/:uid", component: TimelineAlbumViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
