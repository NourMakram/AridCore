import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserExpertiseComponent } from './add-user-expertise.component';

describe('AddUserExpertiseComponent', () => {
  let component: AddUserExpertiseComponent;
  let fixture: ComponentFixture<AddUserExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserExpertiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
