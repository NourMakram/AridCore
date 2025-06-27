import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConifrmComponent } from './email-conifrm.component';

describe('EmailConifrmComponent', () => {
  let component: EmailConifrmComponent;
  let fixture: ComponentFixture<EmailConifrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConifrmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConifrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
