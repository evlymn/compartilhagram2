import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormAlertDialogComponent} from './form-alert-dialog.component';

describe('FormAlertDialogComponent', () => {
  let component: FormAlertDialogComponent;
  let fixture: ComponentFixture<FormAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAlertDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
