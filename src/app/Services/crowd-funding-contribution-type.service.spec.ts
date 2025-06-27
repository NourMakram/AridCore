import { TestBed } from '@angular/core/testing';

import { CrowdFundingContributionTypeService } from './crowd-funding-contribution-type.service';

describe('CrowdFundingContributionTypeService', () => {
  let service: CrowdFundingContributionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdFundingContributionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
