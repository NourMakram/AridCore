import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCalendarEventComponent } from './details-calendar-event.component';

describe('DetailsCalendarEventComponent', () => {
  let component: DetailsCalendarEventComponent;
  let fixture: ComponentFixture<DetailsCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCalendarEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
