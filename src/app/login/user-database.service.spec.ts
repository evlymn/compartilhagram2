import { TestBed } from '@angular/core/testing';

import { UserDatabaseService } from './user-database.service';

describe('UserDatabaseService', () => {
  let service: UserDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
