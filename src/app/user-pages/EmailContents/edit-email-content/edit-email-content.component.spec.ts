import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailContentComponent } from './edit-email-content.component';

describe('EditEmailContentComponent', () => {
  let component: EditEmailContentComponent;
  let fixture: ComponentFixture<EditEmailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmailContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
