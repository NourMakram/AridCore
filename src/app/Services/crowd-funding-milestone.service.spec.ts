import { TestBed } from '@angular/core/testing';

import { CrowdFundingMilestoneService } from './crowd-funding-milestone.service';

describe('CrowdFundingMilestoneService', () => {
  let service: CrowdFundingMilestoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdFundingMilestoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
