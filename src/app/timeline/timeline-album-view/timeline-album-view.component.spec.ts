import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineAlbumViewComponent} from './timeline-album-view.component';

describe('TimelineAlbumViewComponent', () => {
  let component: TimelineAlbumViewComponent;
  let fixture: ComponentFixture<TimelineAlbumViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineAlbumViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimelineAlbumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
