import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPagesComponent } from './client-pages.component';

describe('ClientPagesComponent', () => {
  let component: ClientPagesComponent;
  let fixture: ComponentFixture<ClientPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
