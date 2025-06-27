import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionTypesComponent } from './position-types.component';

describe('PositionTypesComponent', () => {
  let component: PositionTypesComponent;
  let fixture: ComponentFixture<PositionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
