import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrowdFundingContributionTypeComponent } from './edit-crowd-funding-contribution-type.component';

describe('EditCrowdFundingContributionTypeComponent', () => {
  let component: EditCrowdFundingContributionTypeComponent;
  let fixture: ComponentFixture<EditCrowdFundingContributionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCrowdFundingContributionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrowdFundingContributionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
