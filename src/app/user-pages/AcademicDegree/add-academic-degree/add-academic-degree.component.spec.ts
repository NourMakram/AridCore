import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicDegreeComponent } from './add-academic-degree.component';

describe('AddAcademicDegreeComponent', () => {
  let component: AddAcademicDegreeComponent;
  let fixture: ComponentFixture<AddAcademicDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAcademicDegreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAcademicDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
