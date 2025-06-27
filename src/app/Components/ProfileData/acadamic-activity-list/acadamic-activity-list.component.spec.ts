import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadamicActivityListComponent } from './acadamic-activity-list.component';

describe('AcadamicActivityListComponent', () => {
  let component: AcadamicActivityListComponent;
  let fixture: ComponentFixture<AcadamicActivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcadamicActivityListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcadamicActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
