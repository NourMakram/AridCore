import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCvComponent } from './user-cv.component';

describe('UserCvComponent', () => {
  let component: UserCvComponent;
  let fixture: ComponentFixture<UserCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
