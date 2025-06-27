import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCrowdFundingComponent } from './donate-crowd-funding.component';

describe('DonateCrowdFundingComponent', () => {
  let component: DonateCrowdFundingComponent;
  let fixture: ComponentFixture<DonateCrowdFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateCrowdFundingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateCrowdFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
