import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrowdFundingUpdateComponent } from './add-crowd-funding-update.component';

describe('AddCrowdFundingUpdateComponent', () => {
  let component: AddCrowdFundingUpdateComponent;
  let fixture: ComponentFixture<AddCrowdFundingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCrowdFundingUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrowdFundingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
