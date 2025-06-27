import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonateComponent } from './edit-donate.component';

describe('EditDonateComponent', () => {
  let component: EditDonateComponent;
  let fixture: ComponentFixture<EditDonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDonateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
