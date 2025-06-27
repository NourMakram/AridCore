import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialityComponent } from './edit-speciality.component';

describe('EditSpecialityComponent', () => {
  let component: EditSpecialityComponent;
  let fixture: ComponentFixture<EditSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSpecialityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
