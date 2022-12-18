import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormBottomSheetComponent } from './post-form-bottom-sheet.component';

describe('TimelineFormBottomSheetComponent', () => {
  let component: PostFormBottomSheetComponent;
  let fixture: ComponentFixture<PostFormBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFormBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
