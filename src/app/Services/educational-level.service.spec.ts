import { TestBed } from '@angular/core/testing';

import { EducationalLevelService } from './educational-level.service';

describe('EducationalLevelService', () => {
  let service: EducationalLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
