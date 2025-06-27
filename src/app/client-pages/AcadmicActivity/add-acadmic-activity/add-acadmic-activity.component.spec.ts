import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcadmicActivityComponent } from './add-acadmic-activity.component';

describe('AddAcadmicActivityComponent', () => {
  let component: AddAcadmicActivityComponent;
  let fixture: ComponentFixture<AddAcadmicActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAcadmicActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAcadmicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
