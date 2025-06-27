import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdFundingListComponent } from './crowd-funding-list.component';

describe('CrowdFundingListComponent', () => {
  let component: CrowdFundingListComponent;
  let fixture: ComponentFixture<CrowdFundingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdFundingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdFundingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
