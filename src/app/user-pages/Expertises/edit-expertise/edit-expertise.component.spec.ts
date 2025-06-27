import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpertiseComponent } from './edit-expertise.component';

describe('EditExpertiseComponent', () => {
  let component: EditExpertiseComponent;
  let fixture: ComponentFixture<EditExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExpertiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
