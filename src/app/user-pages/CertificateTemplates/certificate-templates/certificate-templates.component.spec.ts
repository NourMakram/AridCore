import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTemplatesComponent } from './certificate-templates.component';

describe('CertificateTemplatesComponent', () => {
  let component: CertificateTemplatesComponent;
  let fixture: ComponentFixture<CertificateTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificateTemplatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
