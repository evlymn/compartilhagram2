import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTextAreaComponent } from './editable-text-area.component';

describe('EditableTextAreaComponent', () => {
  let component: EditableTextAreaComponent;
  let fixture: ComponentFixture<EditableTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTextAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
