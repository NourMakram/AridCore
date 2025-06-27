import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrowdFundingMilestoneComponent } from './add-crowd-funding-milestone.component';

describe('AddCrowdFundingMilestoneComponent', () => {
  let component: AddCrowdFundingMilestoneComponent;
  let fixture: ComponentFixture<AddCrowdFundingMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCrowdFundingMilestoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrowdFundingMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
