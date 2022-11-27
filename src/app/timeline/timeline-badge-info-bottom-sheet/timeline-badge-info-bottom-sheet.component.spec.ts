import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineBadgeInfoBottomSheetComponent} from './timeline-badge-info-bottom-sheet.component';

describe('TimelineBadgeInfoBottomSheetComponent', () => {
  let component: TimelineBadgeInfoBottomSheetComponent;
  let fixture: ComponentFixture<TimelineBadgeInfoBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineBadgeInfoBottomSheetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimelineBadgeInfoBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
