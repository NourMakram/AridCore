import { TestBed } from '@angular/core/testing';

import { LayoutAdsService } from './layout-ads.service';

describe('LayoutAdsService', () => {
  let service: LayoutAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
