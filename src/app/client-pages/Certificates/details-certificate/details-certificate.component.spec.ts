import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCertificateComponent } from './details-certificate.component';

describe('DetailsCertificateComponent', () => {
  let component: DetailsCertificateComponent;
  let fixture: ComponentFixture<DetailsCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
