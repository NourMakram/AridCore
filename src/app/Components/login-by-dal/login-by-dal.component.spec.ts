import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginByDALComponent } from './login-by-dal.component';

describe('LoginByDALComponent', () => {
  let component: LoginByDALComponent;
  let fixture: ComponentFixture<LoginByDALComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginByDALComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginByDALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
