import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuhtorizeComponent } from './un-auhtorize.component';

describe('UnAuhtorizeComponent', () => {
  let component: UnAuhtorizeComponent;
  let fixture: ComponentFixture<UnAuhtorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuhtorizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuhtorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
