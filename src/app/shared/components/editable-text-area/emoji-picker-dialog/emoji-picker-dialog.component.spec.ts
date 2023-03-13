import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPickerDialogComponent } from './emoji-picker-dialog.component';

describe('EmojiPickerDialogComponent', () => {
  let component: EmojiPickerDialogComponent;
  let fixture: ComponentFixture<EmojiPickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojiPickerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
