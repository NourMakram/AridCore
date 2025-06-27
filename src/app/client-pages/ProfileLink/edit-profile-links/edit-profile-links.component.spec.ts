import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileLinksComponent } from './edit-profile-links.component';

describe('EditProfileLinksComponent', () => {
  let component: EditProfileLinksComponent;
  let fixture: ComponentFixture<EditProfileLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
