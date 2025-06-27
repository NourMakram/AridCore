import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditCreditSystemComponent } from './user-edit-credit-system.component';

describe('UserEditCreditSystemComponent', () => {
  let component: UserEditCreditSystemComponent;
  let fixture: ComponentFixture<UserEditCreditSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditCreditSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditCreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
