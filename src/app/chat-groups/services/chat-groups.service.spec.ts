import { TestBed } from '@angular/core/testing';

import { ChatGroupsService } from './chat-groups.service';

describe('ChatGroupsService', () => {
  let service: ChatGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
