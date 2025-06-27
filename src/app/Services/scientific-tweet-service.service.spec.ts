import { TestBed } from '@angular/core/testing';

import { ScientificTweetServiceService } from './scientific-tweet-service.service';

describe('ScientificTweetServiceService', () => {
  let service: ScientificTweetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScientificTweetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
