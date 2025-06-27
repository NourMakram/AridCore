import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddCreditSystemComponent } from './user-add-credit-system.component';

describe('UserAddCreditSystemComponent', () => {
  let component: UserAddCreditSystemComponent;
  let fixture: ComponentFixture<UserAddCreditSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAddCreditSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddCreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
