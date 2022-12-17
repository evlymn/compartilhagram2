import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCommentsItemComponent } from './last-comments-item.component';

describe('LastCommentsItemComponent', () => {
  let component: LastCommentsItemComponent;
  let fixture: ComponentFixture<LastCommentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastCommentsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCommentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
