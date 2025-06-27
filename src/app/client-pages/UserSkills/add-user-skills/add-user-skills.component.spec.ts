import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserSkillsComponent } from './add-user-skills.component';

describe('AddUserSkillsComponent', () => {
  let component: AddUserSkillsComponent;
  let fixture: ComponentFixture<AddUserSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
