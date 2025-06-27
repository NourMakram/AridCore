import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdFundingUsersComponent } from './crowd-funding-users.component';

describe('CrowdFundingUsersComponent', () => {
  let component: CrowdFundingUsersComponent;
  let fixture: ComponentFixture<CrowdFundingUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdFundingUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdFundingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
