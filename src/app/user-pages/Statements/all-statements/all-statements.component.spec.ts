import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStatementsComponent } from './all-statements.component';

describe('AllStatementsComponent', () => {
  let component: AllStatementsComponent;
  let fixture: ComponentFixture<AllStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStatementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
