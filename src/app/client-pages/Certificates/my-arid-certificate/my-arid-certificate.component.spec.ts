import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAridCertificateComponent } from './my-arid-certificate.component';

describe('MyAridCertificateComponent', () => {
  let component: MyAridCertificateComponent;
  let fixture: ComponentFixture<MyAridCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAridCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAridCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
