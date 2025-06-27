import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSummeryComponent } from './user-summery.component';

describe('UserSummeryComponent', () => {
  let component: UserSummeryComponent;
  let fixture: ComponentFixture<UserSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSummeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
