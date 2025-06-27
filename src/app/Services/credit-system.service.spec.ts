import { TestBed } from '@angular/core/testing';

import { CreditSystemService } from './credit-system.service';

describe('CreditSystemService', () => {
  let service: CreditSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
