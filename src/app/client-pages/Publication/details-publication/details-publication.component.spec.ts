import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPublicationComponent } from './details-publication.component';

describe('DetailsPublicationComponent', () => {
  let component: DetailsPublicationComponent;
  let fixture: ComponentFixture<DetailsPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
