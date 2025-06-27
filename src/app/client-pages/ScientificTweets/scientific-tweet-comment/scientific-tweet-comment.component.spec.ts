import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificTweetCommentComponent } from './scientific-tweet-comment.component';

describe('ScientificTweetCommentComponent', () => {
  let component: ScientificTweetCommentComponent;
  let fixture: ComponentFixture<ScientificTweetCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificTweetCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScientificTweetCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
