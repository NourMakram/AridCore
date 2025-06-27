import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCrowdFundingComponent } from './details-crowd-funding.component';

describe('DetailsCrowdFundingComponent', () => {
  let component: DetailsCrowdFundingComponent;
  let fixture: ComponentFixture<DetailsCrowdFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCrowdFundingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCrowdFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
