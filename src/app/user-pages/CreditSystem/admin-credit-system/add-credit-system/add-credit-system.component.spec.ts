import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditSystemComponent } from './add-credit-system.component';

describe('AddCreditSystemComponent', () => {
  let component: AddCreditSystemComponent;
  let fixture: ComponentFixture<AddCreditSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCreditSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
