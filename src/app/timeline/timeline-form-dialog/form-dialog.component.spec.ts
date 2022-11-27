import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogComponent } from './form-dialog.component';

describe('HeaderFormComponent', () => {
  let component: FormDialogComponent;
  let fixture: ComponentFixture<FormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
