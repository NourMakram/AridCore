import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPositionTypesComponent } from './edit-position-types.component';

describe('EditPositionTypesComponent', () => {
  let component: EditPositionTypesComponent;
  let fixture: ComponentFixture<EditPositionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPositionTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPositionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
