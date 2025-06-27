import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventCategoriesComponent } from './calendar-event-categories.component';

describe('CalendarEventCategoriesComponent', () => {
  let component: CalendarEventCategoriesComponent;
  let fixture: ComponentFixture<CalendarEventCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
