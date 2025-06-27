import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingExperienceComponent } from './teaching-experience.component';

describe('TeachingExperienceComponent', () => {
  let component: TeachingExperienceComponent;
  let fixture: ComponentFixture<TeachingExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeachingExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachingExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
