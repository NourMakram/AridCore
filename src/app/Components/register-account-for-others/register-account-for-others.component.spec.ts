import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccountForOthersComponent } from './register-account-for-others.component';

describe('RegisterAccountForOthersComponent', () => {
  let component: RegisterAccountForOthersComponent;
  let fixture: ComponentFixture<RegisterAccountForOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterAccountForOthersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAccountForOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
