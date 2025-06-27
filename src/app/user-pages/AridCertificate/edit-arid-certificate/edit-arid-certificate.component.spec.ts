import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAridCertificateComponent } from './edit-arid-certificate.component';

describe('EditAridCertificateComponent', () => {
  let component: EditAridCertificateComponent;
  let fixture: ComponentFixture<EditAridCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAridCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAridCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
