import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcadmicActivityComponent } from './edit-acadmic-activity.component';

describe('EditAcadmicActivityComponent', () => {
  let component: EditAcadmicActivityComponent;
  let fixture: ComponentFixture<EditAcadmicActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAcadmicActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAcadmicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
