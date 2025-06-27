import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBadgesDialogComponent } from './user-badges-dialog.component';

describe('UserBadgesDialogComponent', () => {
  let component: UserBadgesDialogComponent;
  let fixture: ComponentFixture<UserBadgesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBadgesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBadgesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
