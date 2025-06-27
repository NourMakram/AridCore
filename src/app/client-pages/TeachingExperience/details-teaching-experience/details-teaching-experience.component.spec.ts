import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTeachingExperienceComponent } from './details-teaching-experience.component';

describe('DetailsTeachingExperienceComponent', () => {
  let component: DetailsTeachingExperienceComponent;
  let fixture: ComponentFixture<DetailsTeachingExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTeachingExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTeachingExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
