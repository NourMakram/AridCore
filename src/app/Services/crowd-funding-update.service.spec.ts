import { TestBed } from '@angular/core/testing';

import { CrowdFundingUpdateService } from './crowd-funding-update.service';

describe('CrowdFundingUpdateService', () => {
  let service: CrowdFundingUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdFundingUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
