import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAridCertificateComponent } from './details-arid-certificate.component';

describe('DetailsAridCertificateComponent', () => {
  let component: DetailsAridCertificateComponent;
  let fixture: ComponentFixture<DetailsAridCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAridCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAridCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
