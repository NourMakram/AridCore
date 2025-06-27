import { TestBed } from '@angular/core/testing';

import { AcadmicActivityService } from './acadmic-activity.service';

describe('AcadmicActivityService', () => {
  let service: AcadmicActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcadmicActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
