import { TestBed } from '@angular/core/testing';

import { EmailContentsService } from './email-contents.service';

describe('EmailContentsService', () => {
  let service: EmailContentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailContentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
