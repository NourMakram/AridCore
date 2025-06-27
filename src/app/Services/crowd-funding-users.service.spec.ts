import { TestBed } from '@angular/core/testing';

import { CrowdFundingUsersService } from './crowd-funding-users.service';

describe('CrowdFundingUsersService', () => {
  let service: CrowdFundingUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdFundingUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
