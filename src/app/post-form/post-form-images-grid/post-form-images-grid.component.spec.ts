import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormImagesGridComponent } from './post-form-images-grid.component';

describe('PostFormImagesGridComponent', () => {
  let component: PostFormImagesGridComponent;
  let fixture: ComponentFixture<PostFormImagesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormImagesGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFormImagesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
