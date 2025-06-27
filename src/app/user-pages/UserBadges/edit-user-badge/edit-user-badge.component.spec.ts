import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserBadgeComponent } from './edit-user-badge.component';

describe('EditUserBadgeComponent', () => {
  let component: EditUserBadgeComponent;
  let fixture: ComponentFixture<EditUserBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
