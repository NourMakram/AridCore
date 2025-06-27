import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrowdFundingComponent } from './add-crowd-funding.component';

describe('AddCrowdFundingComponent', () => {
  let component: AddCrowdFundingComponent;
  let fixture: ComponentFixture<AddCrowdFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCrowdFundingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrowdFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
