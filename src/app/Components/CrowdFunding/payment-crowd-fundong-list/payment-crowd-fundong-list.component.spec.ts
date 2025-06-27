import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCrowdFundongListComponent } from './payment-crowd-fundong-list.component';

describe('PaymentCrowdFundongListComponent', () => {
  let component: PaymentCrowdFundongListComponent;
  let fixture: ComponentFixture<PaymentCrowdFundongListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCrowdFundongListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCrowdFundongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
