import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePostComponent } from './timeline-post.component';

describe('TimelinePostComponent', () => {
  let component: TimelinePostComponent;
  let fixture: ComponentFixture<TimelinePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelinePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
