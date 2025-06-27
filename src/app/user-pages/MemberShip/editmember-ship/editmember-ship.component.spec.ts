import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmemberShipComponent } from './editmember-ship.component';

describe('EditmemberShipComponent', () => {
  let component: EditmemberShipComponent;
  let fixture: ComponentFixture<EditmemberShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditmemberShipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmemberShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
