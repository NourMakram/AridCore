import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducationalLevelComponent } from './add-educational-level.component';

describe('AddEducationalLevelComponent', () => {
  let component: AddEducationalLevelComponent;
  let fixture: ComponentFixture<AddEducationalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEducationalLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEducationalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
