import { TestBed } from '@angular/core/testing';

import { UserBadgeService } from './user-badge.service';

describe('UserBadgeService', () => {
  let service: UserBadgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBadgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
