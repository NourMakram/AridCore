import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEducationalLevelComponent } from './edit-educational-level.component';

describe('EditEducationalLevelComponent', () => {
  let component: EditEducationalLevelComponent;
  let fixture: ComponentFixture<EditEducationalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEducationalLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEducationalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
