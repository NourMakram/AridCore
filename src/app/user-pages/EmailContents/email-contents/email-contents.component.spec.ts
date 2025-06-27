import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContentsComponent } from './email-contents.component';

describe('EmailContentsComponent', () => {
  let component: EmailContentsComponent;
  let fixture: ComponentFixture<EmailContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailContentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
