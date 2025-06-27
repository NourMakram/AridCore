import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExpertisesComponent } from './user-expertises.component';

describe('UserExpertisesComponent', () => {
  let component: UserExpertisesComponent;
  let fixture: ComponentFixture<UserExpertisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserExpertisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExpertisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
