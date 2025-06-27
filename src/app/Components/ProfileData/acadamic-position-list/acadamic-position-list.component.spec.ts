import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadamicPositionListComponent } from './acadamic-position-list.component';

describe('AcadamicPositionListComponent', () => {
  let component: AcadamicPositionListComponent;
  let fixture: ComponentFixture<AcadamicPositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcadamicPositionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcadamicPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
