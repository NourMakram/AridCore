import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicPositionComponent } from './add-academic-position.component';

describe('AddAcademicPositionComponent', () => {
  let component: AddAcademicPositionComponent;
  let fixture: ComponentFixture<AddAcademicPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAcademicPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAcademicPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
