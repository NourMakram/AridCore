import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrowdFundingComponent } from './edit-crowd-funding.component';

describe('EditCrowdFundingComponent', () => {
  let component: EditCrowdFundingComponent;
  let fixture: ComponentFixture<EditCrowdFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCrowdFundingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrowdFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
