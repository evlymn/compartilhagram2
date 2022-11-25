import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {LoginService} from "../login.service";

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
              private _loginService: LoginService) {
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
      this._loginService.login(this.email?.value, this.password?.value).then(user => {
        formDirective.resetForm();
      }).catch(err => console.log(err))
    }
  }
}
