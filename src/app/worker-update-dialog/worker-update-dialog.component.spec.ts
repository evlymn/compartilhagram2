import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerUpdateDialogComponent } from './worker-update-dialog.component';

describe('WorkerUpdateDialogComponent', () => {
  let component: WorkerUpdateDialogComponent;
  let fixture: ComponentFixture<WorkerUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerUpdateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
