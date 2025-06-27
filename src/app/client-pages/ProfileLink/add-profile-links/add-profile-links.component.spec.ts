import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileLinksComponent } from './add-profile-links.component';

describe('AddProfileLinksComponent', () => {
  let component: AddProfileLinksComponent;
  let fixture: ComponentFixture<AddProfileLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProfileLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProfileLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
