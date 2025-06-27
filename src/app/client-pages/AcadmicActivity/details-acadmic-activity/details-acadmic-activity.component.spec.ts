import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAcadmicActivityComponent } from './details-acadmic-activity.component';

describe('DetailsAcadmicActivityComponent', () => {
  let component: DetailsAcadmicActivityComponent;
  let fixture: ComponentFixture<DetailsAcadmicActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAcadmicActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAcadmicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
