import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HomeHeaderMobileComponent} from "./home-header-mobile/home-header-mobile.component";
import {MatRippleModule} from "@angular/material/core";
import { HomeMenuMobileComponent } from './home-menu-mobile/home-menu-mobile.component';
import {MatMenuModule} from "@angular/material/menu";
import { HomeMenuDesktopComponent } from './home-menu-desktop/home-menu-desktop.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderMobileComponent,
    HomeMenuMobileComponent,
    HomeMenuDesktopComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatMenuModule,


    ]
})
export class HomeModule {
}
