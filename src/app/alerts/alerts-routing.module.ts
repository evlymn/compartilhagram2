import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertsComponent} from "./alerts.component";

let routes: Routes;
routes = [
  {
    path: "", component: AlertsComponent
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AlertsRoutingModule {
}
