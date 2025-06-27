import { TestBed } from '@angular/core/testing';

import { DonateServiceService } from './donate-service.service';

describe('DonateServiceService', () => {
  let service: DonateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
