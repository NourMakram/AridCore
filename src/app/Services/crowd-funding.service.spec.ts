import { TestBed } from '@angular/core/testing';

import { CrowdFundingService } from './crowd-funding.service';

describe('CrowdFundingService', () => {
  let service: CrowdFundingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdFundingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
