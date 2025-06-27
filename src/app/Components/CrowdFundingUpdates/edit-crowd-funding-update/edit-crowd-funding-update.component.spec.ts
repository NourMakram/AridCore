import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrowdFundingUpdateComponent } from './edit-crowd-funding-update.component';

describe('EditCrowdFundingUpdateComponent', () => {
  let component: EditCrowdFundingUpdateComponent;
  let fixture: ComponentFixture<EditCrowdFundingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCrowdFundingUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrowdFundingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
