import { TestBed } from '@angular/core/testing';

import { AcademicDegreeService } from './academic-degree.service';

describe('AcademicDegreeService', () => {
  let service: AcademicDegreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicDegreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
