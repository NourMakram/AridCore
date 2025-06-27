import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrowdFundingContributionTypeComponent } from './add-crowd-funding-contribution-type.component';

describe('AddCrowdFundingContributionTypeComponent', () => {
  let component: AddCrowdFundingContributionTypeComponent;
  let fixture: ComponentFixture<AddCrowdFundingContributionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCrowdFundingContributionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrowdFundingContributionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
