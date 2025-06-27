import { TestBed } from '@angular/core/testing';

import { MemberShipService } from './member-ship.service';

describe('MemberShipService', () => {
  let service: MemberShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberShipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
