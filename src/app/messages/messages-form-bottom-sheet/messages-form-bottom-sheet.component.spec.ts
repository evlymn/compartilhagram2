import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesFormBottomSheetComponent} from './messages-form-bottom-sheet.component';

describe('MessagesFormBottomSheetComponent', () => {
  let component: MessagesFormBottomSheetComponent;
  let fixture: ComponentFixture<MessagesFormBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesFormBottomSheetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MessagesFormBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
