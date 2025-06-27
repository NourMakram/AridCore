import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdsComponent } from './layout-ads.component';

describe('LayoutAdsComponent', () => {
  let component: LayoutAdsComponent;
  let fixture: ComponentFixture<LayoutAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
