import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachingExperienceComponent } from './edit-teaching-experience.component';

describe('EditTeachingExperienceComponent', () => {
  let component: EditTeachingExperienceComponent;
  let fixture: ComponentFixture<EditTeachingExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTeachingExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeachingExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
