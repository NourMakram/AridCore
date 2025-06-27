import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLayoutAdsComponent } from './add-layout-ads.component';

describe('AddLayoutAdsComponent', () => {
  let component: AddLayoutAdsComponent;
  let fixture: ComponentFixture<AddLayoutAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLayoutAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLayoutAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
