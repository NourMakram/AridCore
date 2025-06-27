import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSkillsComponent } from './edit-user-skills.component';

describe('EditUserSkillsComponent', () => {
  let component: EditUserSkillsComponent;
  let fixture: ComponentFixture<EditUserSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
