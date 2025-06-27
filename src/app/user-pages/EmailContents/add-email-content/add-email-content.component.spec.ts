import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailContentComponent } from './add-email-content.component';

describe('AddEmailContentComponent', () => {
  let component: AddEmailContentComponent;
  let fixture: ComponentFixture<AddEmailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmailContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
