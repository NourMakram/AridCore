import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSendingLogsComponent } from './email-sending-logs.component';

describe('EmailSendingLogsComponent', () => {
  let component: EmailSendingLogsComponent;
  let fixture: ComponentFixture<EmailSendingLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailSendingLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSendingLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
