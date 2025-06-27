import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingExperienceListComponent } from './teaching-experience-list.component';

describe('TeachingExperienceListComponent', () => {
  let component: TeachingExperienceListComponent;
  let fixture: ComponentFixture<TeachingExperienceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachingExperienceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachingExperienceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
