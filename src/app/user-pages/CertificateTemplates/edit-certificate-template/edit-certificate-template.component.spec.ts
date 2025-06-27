import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertificateTemplateComponent } from './edit-certificate-template.component';

describe('EditCertificateTemplateComponent', () => {
  let component: EditCertificateTemplateComponent;
  let fixture: ComponentFixture<EditCertificateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCertificateTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCertificateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
