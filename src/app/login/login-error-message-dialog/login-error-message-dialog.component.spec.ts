import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginErrorMessageDialogComponent} from './login-error-message-dialog.component';

describe('LoginErrorMessageDialogComponent', () => {
  let component: LoginErrorMessageDialogComponent;
  let fixture: ComponentFixture<LoginErrorMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginErrorMessageDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginErrorMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
