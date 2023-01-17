import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgFormBottomSheetComponent } from './cg-form-bottom-sheet.component';

describe('CgFormBottomSheetComponent', () => {
  let component: CgFormBottomSheetComponent;
  let fixture: ComponentFixture<CgFormBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgFormBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgFormBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
