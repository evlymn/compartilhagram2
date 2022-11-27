import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginSignInComponent } from './login-sign-in/login-sign-in.component';
import { LoginCreateUserComponent } from './login-create-user/login-create-user.component';
import {LoginCompareToDirective} from './login-directives/login-compare-to/login-compare-to.directive';
import {LoginImageProfileDialogComponent} from "./login-image-profile-dialog/login-image-profile-dialog.component";
import {MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {ImageCropperModule} from "ngx-image-cropper";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {LoginErrorMessageDialogComponent} from "./login-error-message-dialog/login-error-message-dialog.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LoginCompareToDirective,
    LoginComponent,
    LoginSignInComponent,
    LoginCreateUserComponent,
    LoginImageProfileDialogComponent,
    LoginErrorMessageDialogComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatTabsModule,
        FormsModule,
        MatRippleModule,
        MatDialogModule,
        ImageCropperModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatButtonModule,
    ]
})
export class LoginModule {
}
