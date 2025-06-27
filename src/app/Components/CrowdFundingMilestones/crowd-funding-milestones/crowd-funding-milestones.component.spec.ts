import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdFundingMilestonesComponent } from './crowd-funding-milestones.component';

describe('CrowdFundingMilestonesComponent', () => {
  let component: CrowdFundingMilestonesComponent;
  let fixture: ComponentFixture<CrowdFundingMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdFundingMilestonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdFundingMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
