import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditSystemComponent } from './edit-credit-system.component';

describe('EditCreditSystemComponent', () => {
  let component: EditCreditSystemComponent;
  let fixture: ComponentFixture<EditCreditSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCreditSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
