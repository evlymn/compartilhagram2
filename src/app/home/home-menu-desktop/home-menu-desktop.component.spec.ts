import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuDesktopComponent } from './home-menu-desktop.component';

describe('HomeMenuDesktopComponent', () => {
  let component: HomeMenuDesktopComponent;
  let fixture: ComponentFixture<HomeMenuDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMenuDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMenuDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
