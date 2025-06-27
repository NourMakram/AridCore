import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadmicActivitesComponent } from './acadmic-activites.component';

describe('AcadmicActivitesComponent', () => {
  let component: AcadmicActivitesComponent;
  let fixture: ComponentFixture<AcadmicActivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcadmicActivitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcadmicActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
