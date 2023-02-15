import { TestBed } from '@angular/core/testing';

import { TimelineDatabaseTriggersService } from './timeline-database-triggers.service';

describe('TimelineDatabaseTriggersService', () => {
  let service: TimelineDatabaseTriggersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineDatabaseTriggersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
