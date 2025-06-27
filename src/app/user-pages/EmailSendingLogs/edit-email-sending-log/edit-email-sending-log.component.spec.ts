import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailSendingLogComponent } from './edit-email-sending-log.component';

describe('EditEmailSendingLogComponent', () => {
  let component: EditEmailSendingLogComponent;
  let fixture: ComponentFixture<EditEmailSendingLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmailSendingLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmailSendingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
