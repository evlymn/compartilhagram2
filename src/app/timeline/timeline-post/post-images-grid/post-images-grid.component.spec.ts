import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostImagesGridComponent} from './post-images-grid.component';

describe('PostImagesGridComponent', () => {
  let component: PostImagesGridComponent;
  let fixture: ComponentFixture<PostImagesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostImagesGridComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostImagesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
