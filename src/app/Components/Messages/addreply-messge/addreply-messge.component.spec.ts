import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreplyMessgeComponent } from './addreply-messge.component';

describe('AddreplyMessgeComponent', () => {
  let component: AddreplyMessgeComponent;
  let fixture: ComponentFixture<AddreplyMessgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddreplyMessgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddreplyMessgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
