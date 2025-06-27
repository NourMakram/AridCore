import { TestBed } from '@angular/core/testing';

import { SendersService } from './senders.service';

describe('SendersService', () => {
  let service: SendersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
