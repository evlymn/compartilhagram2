import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePostDetailComponent } from './timeline-post-detail.component';

describe('TimelinePostDetailComponent', () => {
  let component: TimelinePostDetailComponent;
  let fixture: ComponentFixture<TimelinePostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinePostDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelinePostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
