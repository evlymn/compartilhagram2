import { TestBed } from '@angular/core/testing';

import { ImageViewService } from './image-view.service';

describe('ImageViewService', () => {
  let service: ImageViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
