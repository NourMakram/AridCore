import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAcademicPositionComponent } from './details-academic-position.component';

describe('DetailsAcademicPositionComponent', () => {
  let component: DetailsAcademicPositionComponent;
  let fixture: ComponentFixture<DetailsAcademicPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAcademicPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAcademicPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
