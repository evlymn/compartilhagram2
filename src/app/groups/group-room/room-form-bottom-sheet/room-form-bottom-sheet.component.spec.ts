import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomFormBottomSheetComponent} from './room-form-bottom-sheet.component';

describe('RoomFormBottomSheetComponent', () => {
  let component: RoomFormBottomSheetComponent;
  let fixture: ComponentFixture<RoomFormBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomFormBottomSheetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomFormBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
