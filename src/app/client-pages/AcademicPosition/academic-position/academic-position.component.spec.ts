import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicPositionComponent } from './academic-position.component';

describe('AcademicPositionComponent', () => {
  let component: AcademicPositionComponent;
  let fixture: ComponentFixture<AcademicPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcademicPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
