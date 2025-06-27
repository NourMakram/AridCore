import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrowdFundingMilestoneComponent } from './edit-crowd-funding-milestone.component';

describe('EditCrowdFundingMilestoneComponent', () => {
  let component: EditCrowdFundingMilestoneComponent;
  let fixture: ComponentFixture<EditCrowdFundingMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCrowdFundingMilestoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrowdFundingMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
