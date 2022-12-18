import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFormBottomSheetComponent } from './timeline-form-bottom-sheet.component';

describe('TimelineFormBottomSheetComponent', () => {
  let component: TimelineFormBottomSheetComponent;
  let fixture: ComponentFixture<TimelineFormBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineFormBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineFormBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
