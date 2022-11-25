import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCreateUserComponent } from './login-create-user.component';

describe('LoginCreateUserComponent', () => {
  let component: LoginCreateUserComponent;
  let fixture: ComponentFixture<LoginCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCreateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
