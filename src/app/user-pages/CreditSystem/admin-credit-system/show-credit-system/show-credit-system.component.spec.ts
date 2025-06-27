import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCreditSystemComponent } from './show-credit-system.component';

describe('ShowCreditSystemComponent', () => {
  let component: ShowCreditSystemComponent;
  let fixture: ComponentFixture<ShowCreditSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCreditSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
