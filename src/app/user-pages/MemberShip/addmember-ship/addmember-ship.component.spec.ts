import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmemberShipComponent } from './addmember-ship.component';

describe('AddmemberShipComponent', () => {
  let component: AddmemberShipComponent;
  let fixture: ComponentFixture<AddmemberShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddmemberShipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmemberShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
