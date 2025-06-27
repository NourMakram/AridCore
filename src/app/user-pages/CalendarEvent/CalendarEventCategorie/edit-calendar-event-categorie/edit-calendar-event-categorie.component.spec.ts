import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalendarEventCategorieComponent } from './edit-calendar-event-categorie.component';

describe('EditCalendarEventCategorieComponent', () => {
  let component: EditCalendarEventCategorieComponent;
  let fixture: ComponentFixture<EditCalendarEventCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCalendarEventCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCalendarEventCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
