import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShipLetterComponent } from './member-ship-letter.component';

describe('MemberShipLetterComponent', () => {
  let component: MemberShipLetterComponent;
  let fixture: ComponentFixture<MemberShipLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberShipLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberShipLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
