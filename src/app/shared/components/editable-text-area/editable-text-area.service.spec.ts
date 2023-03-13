import { TestBed } from '@angular/core/testing';

import { EditableTextAreaService } from './editable-text-area.service';

describe('EditableTextAreaService', () => {
  let service: EditableTextAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditableTextAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
