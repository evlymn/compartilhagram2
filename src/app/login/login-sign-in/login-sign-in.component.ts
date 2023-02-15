import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {LoginErrorMessageDialogComponent} from "../login-error-message-dialog/login-error-message-dialog.component";
import {LoginErrorMessages} from "../login-error-messages/login-error-messages";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-sign-in',
  templateUrl: './login-sign-in.component.html',
  styleUrls: ['./login-sign-in.component.scss']
})
export class LoginSignInComponent {
  form!: FormGroup;
  formSubmitted = false;

  public get email(): AbstractControl | null {
    return this.form.get("email");
  }

  public get password(): AbstractControl | null {
    return this.form.get("password");
  }

  constructor(private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              public _loginService: LoginService,
              private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(formDirective: FormGroupDirective) {
    this.formSubmitted = true;
    if (this.form.valid) {
      this._loginService.login(this.email?.value, this.password?.value).then(() => {
        formDirective.resetForm();
      }).catch(error => {
        this._dialog.open(LoginErrorMessageDialogComponent, {
          panelClass: 'ErrorMessageDialogComponent',
          width: '350px',
          height: 'auto',
          data: LoginErrorMessages[error.code],
        });
        formDirective.resetForm();
      })
    }
  }

  signInWithGoogle() {
    this._loginService.auth.signInWithGoogle().catch();
  }
  signInWithGithub() {
    this._loginService.auth.signInWithGithub().catch();
  }
}

