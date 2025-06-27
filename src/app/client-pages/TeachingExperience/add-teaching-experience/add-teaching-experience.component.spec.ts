import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeachingExperienceComponent } from './add-teaching-experience.component';

describe('AddTeachingExperienceComponent', () => {
  let component: AddTeachingExperienceComponent;
  let fixture: ComponentFixture<AddTeachingExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTeachingExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeachingExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
