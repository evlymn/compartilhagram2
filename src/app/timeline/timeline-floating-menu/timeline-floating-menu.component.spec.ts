import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineFloatingMenuComponent} from './timeline-floating-menu.component';

describe('TimelineFloatingMenuComponent', () => {
  let component: TimelineFloatingMenuComponent;
  let fixture: ComponentFixture<TimelineFloatingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineFloatingMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimelineFloatingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
