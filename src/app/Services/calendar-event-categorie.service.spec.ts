import { TestBed } from '@angular/core/testing';

import { CalendarEventCategorieService } from './calendar-event-categorie.service';

describe('CalendarEventCategorieService', () => {
  let service: CalendarEventCategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarEventCategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
