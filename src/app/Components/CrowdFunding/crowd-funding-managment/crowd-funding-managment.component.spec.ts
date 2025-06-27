import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdFundingManagmentComponent } from './crowd-funding-managment.component';

describe('CrowdFundingManagmentComponent', () => {
  let component: CrowdFundingManagmentComponent;
  let fixture: ComponentFixture<CrowdFundingManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdFundingManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdFundingManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
