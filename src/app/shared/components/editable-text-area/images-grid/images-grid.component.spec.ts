import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesGridComponent } from './images-grid.component';

describe('PostFormImagesGridComponent', () => {
  let component: ImagesGridComponent;
  let fixture: ComponentFixture<ImagesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
