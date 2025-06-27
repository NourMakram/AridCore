import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailSendingLogComponent } from './add-email-sending-log.component';

describe('AddEmailSendingLogComponent', () => {
  let component: AddEmailSendingLogComponent;
  let fixture: ComponentFixture<AddEmailSendingLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmailSendingLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmailSendingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
