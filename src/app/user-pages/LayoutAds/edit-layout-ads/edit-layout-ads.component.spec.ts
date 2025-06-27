import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLayoutAdsComponent } from './edit-layout-ads.component';

describe('EditLayoutAdsComponent', () => {
  let component: EditLayoutAdsComponent;
  let fixture: ComponentFixture<EditLayoutAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLayoutAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLayoutAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
