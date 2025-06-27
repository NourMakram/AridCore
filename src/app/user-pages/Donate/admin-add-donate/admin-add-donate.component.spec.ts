import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddDonateComponent } from './admin-add-donate.component';

describe('AdminAddDonateComponent', () => {
  let component: AdminAddDonateComponent;
  let fixture: ComponentFixture<AdminAddDonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddDonateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
