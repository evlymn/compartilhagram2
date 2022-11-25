import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignInComponent } from './login-sign-in.component';

describe('LoginSignInComponent', () => {
  let component: LoginSignInComponent;
  let fixture: ComponentFixture<LoginSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSignInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
