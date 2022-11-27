import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuMobileComponent } from './home-menu-mobile.component';

describe('HomeMenuMobileComponent', () => {
  let component: HomeMenuMobileComponent;
  let fixture: ComponentFixture<HomeMenuMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMenuMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
