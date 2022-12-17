import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLastCommentsComponent } from './post-last-comments.component';

describe('PostLastCommentsComponent', () => {
  let component: PostLastCommentsComponent;
  let fixture: ComponentFixture<PostLastCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLastCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLastCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
