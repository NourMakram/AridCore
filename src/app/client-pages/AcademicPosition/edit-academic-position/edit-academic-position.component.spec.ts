import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcademicPositionComponent } from './edit-academic-position.component';

describe('EditAcademicPositionComponent', () => {
  let component: EditAcademicPositionComponent;
  let fixture: ComponentFixture<EditAcademicPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAcademicPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAcademicPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
