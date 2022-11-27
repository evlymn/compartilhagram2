import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderMobileComponent } from './home-header-mobile.component';

describe('HomeHeaderMobileComponent', () => {
  let component: HomeHeaderMobileComponent;
  let fixture: ComponentFixture<HomeHeaderMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHeaderMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
