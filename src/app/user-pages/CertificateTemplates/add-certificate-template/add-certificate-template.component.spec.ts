import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateTemplateComponent } from './add-certificate-template.component';

describe('AddCertificateTemplateComponent', () => {
  let component: AddCertificateTemplateComponent;
  let fixture: ComponentFixture<AddCertificateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCertificateTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCertificateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
