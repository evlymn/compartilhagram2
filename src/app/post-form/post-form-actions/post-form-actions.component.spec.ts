import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormActionsComponent } from './post-form-actions.component';

describe('PostFormActionsComponent', () => {
  let component: PostFormActionsComponent;
  let fixture: ComponentFixture<PostFormActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
