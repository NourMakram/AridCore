import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSendersComponent } from './edit-senders.component';

describe('EditSendersComponent', () => {
  let component: EditSendersComponent;
  let fixture: ComponentFixture<EditSendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
