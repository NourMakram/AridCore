import { TestBed } from '@angular/core/testing';

import { AcademicPositionService } from './academic-position.service';

describe('AcademicPositionService', () => {
  let service: AcademicPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
