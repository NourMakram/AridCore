import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarEventCategorieComponent } from './add-calendar-event-categorie.component';

describe('AddCalendarEventCategorieComponent', () => {
  let component: AddCalendarEventCategorieComponent;
  let fixture: ComponentFixture<AddCalendarEventCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCalendarEventCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalendarEventCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
