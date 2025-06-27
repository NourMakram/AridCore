import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AridCertificatesComponent } from './arid-certificates.component';

describe('AridCertificatesComponent', () => {
  let component: AridCertificatesComponent;
  let fixture: ComponentFixture<AridCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AridCertificatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AridCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
