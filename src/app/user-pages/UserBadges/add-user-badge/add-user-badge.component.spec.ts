import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserBadgeComponent } from './add-user-badge.component';

describe('AddUserBadgeComponent', () => {
  let component: AddUserBadgeComponent;
  let fixture: ComponentFixture<AddUserBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
