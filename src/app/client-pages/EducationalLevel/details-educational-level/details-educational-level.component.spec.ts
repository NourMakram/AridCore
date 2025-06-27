import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEducationalLevelComponent } from './details-educational-level.component';

describe('DetailsEducationalLevelComponent', () => {
  let component: DetailsEducationalLevelComponent;
  let fixture: ComponentFixture<DetailsEducationalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEducationalLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEducationalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
