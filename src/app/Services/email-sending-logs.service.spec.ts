import { TestBed } from '@angular/core/testing';

import { EmailSendingLogsService } from './email-sending-logs.service';

describe('EmailSendingLogsService', () => {
  let service: EmailSendingLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSendingLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
