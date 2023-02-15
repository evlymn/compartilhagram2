import { TestBed } from '@angular/core/testing';

import { TimelineDatabaseService } from './timeline-database.service';

describe('TimelineDatabaseService', () => {
  let service: TimelineDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
