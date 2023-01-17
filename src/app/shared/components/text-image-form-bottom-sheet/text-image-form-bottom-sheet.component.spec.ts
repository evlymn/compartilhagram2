import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextImageFormBottomSheetComponent } from './text-image-form-bottom-sheet.component';

describe('TextImageFormBottomSheetComponent', () => {
  let component: TextImageFormBottomSheetComponent;
  let fixture: ComponentFixture<TextImageFormBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextImageFormBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextImageFormBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
