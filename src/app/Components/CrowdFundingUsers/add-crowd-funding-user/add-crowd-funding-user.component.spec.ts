import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrowdFundingUserComponent } from './add-crowd-funding-user.component';

describe('AddCrowdFundingUserComponent', () => {
  let component: AddCrowdFundingUserComponent;
  let fixture: ComponentFixture<AddCrowdFundingUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCrowdFundingUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrowdFundingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
