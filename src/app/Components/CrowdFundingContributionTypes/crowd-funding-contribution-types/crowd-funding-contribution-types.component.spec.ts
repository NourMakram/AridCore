import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdFundingContributionTypesComponent } from './crowd-funding-contribution-types.component';

describe('CrowdFundingContributionTypesComponent', () => {
  let component: CrowdFundingContributionTypesComponent;
  let fixture: ComponentFixture<CrowdFundingContributionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdFundingContributionTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdFundingContributionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
