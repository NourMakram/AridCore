import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDonateComponent } from './add-donate.component';

describe('AddDonateComponent', () => {
  let component: AddDonateComponent;
  let fixture: ComponentFixture<AddDonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDonateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
