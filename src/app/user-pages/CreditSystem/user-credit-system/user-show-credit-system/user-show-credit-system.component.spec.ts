import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowCreditSystemComponent } from './user-show-credit-system.component';

describe('UserShowCreditSystemComponent', () => {
  let component: UserShowCreditSystemComponent;
  let fixture: ComponentFixture<UserShowCreditSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserShowCreditSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShowCreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
