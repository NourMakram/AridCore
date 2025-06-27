import { TestBed } from '@angular/core/testing';

import { TeachingExperienceService } from './teaching-experience.service';

describe('TeachingExperienceService', () => {
  let service: TeachingExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachingExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
