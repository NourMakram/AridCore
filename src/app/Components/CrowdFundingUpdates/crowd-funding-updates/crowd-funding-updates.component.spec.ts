import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdFundingUpdatesComponent } from './crowd-funding-updates.component';

describe('CrowdFundingUpdatesComponent', () => {
  let component: CrowdFundingUpdatesComponent;
  let fixture: ComponentFixture<CrowdFundingUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdFundingUpdatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdFundingUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
