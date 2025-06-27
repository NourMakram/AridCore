import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAridCertificateComponent } from './add-arid-certificate.component';

describe('AddAridCertificateComponent', () => {
  let component: AddAridCertificateComponent;
  let fixture: ComponentFixture<AddAridCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAridCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAridCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
