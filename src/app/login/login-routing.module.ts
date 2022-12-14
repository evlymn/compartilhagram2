import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login.component";
import {LoginSplashScreenComponent} from "./login-splash-screen/login-splash-screen.component";

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },{
    path: "", component: LoginSplashScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],

})
export class LoginRoutingModule {
}
