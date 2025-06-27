import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserExpertiseComponent } from './edit-user-expertise.component';

describe('EditUserExpertiseComponent', () => {
  let component: EditUserExpertiseComponent;
  let fixture: ComponentFixture<EditUserExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserExpertiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
