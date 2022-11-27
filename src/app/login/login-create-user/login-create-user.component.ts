import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoginImageProfileDialogComponent} from "../login-image-profile-dialog/login-image-profile-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {LoginErrorMessageDialogComponent} from "../login-error-message-dialog/login-error-message-dialog.component";
import {LoginErrorMessages} from "../login-error-messages/login-error-messages";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {LoginCompareToDirective} from "../login-directives/login-compare-to/login-compare-to.directive";

@Component({
  selector: 'app-login-create-user',
  templateUrl: './login-create-user.component.html',
  styleUrls: ['./login-create-user.component.scss']
})
export class LoginCreateUserComponent {
  @ViewChild('file') file!: ElementRef;
  @ViewChild('password1') password1!: ElementRef;
  public get name(): AbstractControl | null {
    return this.form.get("name");
  }

  public get email(): AbstractControl | null {
    return this.form.get("email");
  }

  public get password(): AbstractControl | null {
    return this.form.get("password");
  }

  public get retypePassword(): AbstractControl | null {
    return this.form.get("retypePassword");
  }

  imageUrl = './assets/images/foto-perfil.png';
  avatarStyle = `background-image: url(${this.imageUrl})`;
  form!: FormGroup;
  submitted = false;
  logout = false;
  img64 = '';
  progressMode: ProgressBarMode = 'indeterminate';
  hintMessage =''
  fileName = '';
  progress = 0;

  constructor(private _dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private _loginService: LoginService) {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      name: new FormControl('' , [Validators.required],),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      retypePassword: new FormControl('', [Validators.required,]),
    });
  }

  async submit(formDirective: FormGroupDirective) {
    this.submitted = true;
    try {
      if (this.img64 && this.form.valid) {
       this.hintMessage = 'Cadastrando usuária(o)...';
        const uploadTaskSnapshot = await this._loginService.signUp(this.email?.value, this.password?.value, this.name?.value, this.img64);
        const subs = uploadTaskSnapshot.subscribe(snapshot => {
          if (snapshot.progress == 0) {
            this.progressMode = 'determinate';
            snapshot.snapshot.task.then(_ => {
              subs.unsubscribe();
              this.hintMessage = 'redirecionando...';
              this.progress = 0;
            })
          }
          this.progress = Number.parseInt(snapshot.progress.toFixed(0));
        })
      }
    } catch (error: any) {
      this.hintMessage = '';
      this.submitted = false;
      this._dialog.open(LoginErrorMessageDialogComponent, {
        panelClass: 'ErrorMessageDialogComponent',
        width: '350px',
        data: LoginErrorMessages[error.code],
      });
      formDirective.resetForm();
    }
  }

  changeAvatarStyle(imageUrl: string) {
    this.avatarStyle = imageUrl ? `background-image: url(${imageUrl})` : this.avatarStyle;
  }

  fileChangeEvent(e: any) {
    if (e.target.files[0]) {
      const dialogRef = this._dialog.open(LoginImageProfileDialogComponent, {
        panelClass: 'ImageProfileDialogComponent',
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        data: e,
      });

      dialogRef.afterClosed().subscribe(result => {
        this.file.nativeElement.value = null;
        if (result) {
          this.submitted = false;
          this.img64 = result;
          this.changeAvatarStyle(this.img64)
        }
      });
    }
  }
}
