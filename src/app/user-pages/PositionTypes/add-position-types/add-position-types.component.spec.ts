import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPositionTypesComponent } from './add-position-types.component';

describe('AddPositionTypesComponent', () => {
  let component: AddPositionTypesComponent;
  let fixture: ComponentFixture<AddPositionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPositionTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPositionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
