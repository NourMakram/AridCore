import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSendersComponent } from './add-senders.component';

describe('AddSendersComponent', () => {
  let component: AddSendersComponent;
  let fixture: ComponentFixture<AddSendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
