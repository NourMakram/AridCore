import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInnovativeIdeaComponent } from './add-innovative-idea.component';

describe('AddInnovativeIdeaComponent', () => {
  let component: AddInnovativeIdeaComponent;
  let fixture: ComponentFixture<AddInnovativeIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInnovativeIdeaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInnovativeIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
