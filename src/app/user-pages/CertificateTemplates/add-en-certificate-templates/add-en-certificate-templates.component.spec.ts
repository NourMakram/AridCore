import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnCertificateTemplatesComponent } from './add-en-certificate-templates.component';

describe('AddEnCertificateTemplatesComponent', () => {
  let component: AddEnCertificateTemplatesComponent;
  let fixture: ComponentFixture<AddEnCertificateTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEnCertificateTemplatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnCertificateTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
