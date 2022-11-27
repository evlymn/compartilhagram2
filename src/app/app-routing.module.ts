import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "", loadChildren: () => import('./login/login-routing.module').then(m => m.LoginRoutingModule)
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./timeline/timeline-routing.module').then(m => m.TimelineRoutingModule)
      },
      {
        path: "search",
        loadChildren: () => import('./timeline/timeline-routing.module').then(m => m.TimelineRoutingModule)
      },
      {
        path: "following",
        loadChildren: () => import('./timeline/timeline-routing.module').then(m => m.TimelineRoutingModule)
      },
      {
        path: "alerts",
        loadChildren: () => import('./alerts/alerts-routing.module').then(m => m.AlertsRoutingModule)
      },
      {
        path: "saved",
        loadChildren: () => import('./timeline/timeline-routing.module').then(m => m.TimelineRoutingModule)
      },
      {
        path: "details/:id/:index",
        loadChildren: () => import('./timeline/timeline-routing.module').then(m => m.TimelineRoutingModule)
      },
      {
        path: "messages",
        loadChildren: () => import('./messages/messages-routing.module').then(m => m.MessagesRoutingModule)
      },
      {
        path: "messages/:userId",
        loadChildren: () => import('./messages/messages-routing.module').then(m => m.MessagesRoutingModule)
      },
      {
        path: "profile/:userId",
        loadChildren: () => import('./profile/profile-routing.module').then(m => m.ProfileRoutingModule)
      },
      {
        path: "groups",
        loadChildren: () => import('./groups/groups-routing.module').then(m => m.GroupsRoutingModule)
      }, {
        path: "groups/:groupId",
        loadChildren: () => import('./groups/groups-routing.module').then(m => m.GroupsRoutingModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
