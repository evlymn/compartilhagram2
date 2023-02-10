import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadItemComponent } from './image-upload-item.component';

describe('ImageUploadItemComponent', () => {
  let component: ImageUploadItemComponent;
  let fixture: ComponentFixture<ImageUploadItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
