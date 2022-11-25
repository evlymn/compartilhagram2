import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginImageProfileDialogComponent} from './login-image-profile-dialog.component';

describe('LoginImageProfileDialogComponent', () => {
  let component: LoginImageProfileDialogComponent;
  let fixture: ComponentFixture<LoginImageProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginImageProfileDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginImageProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
