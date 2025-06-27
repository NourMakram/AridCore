import { TestBed } from '@angular/core/testing';

import { AridCertificateService } from './arid-certificate.service';

describe('AridCertificateService', () => {
  let service: AridCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AridCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
