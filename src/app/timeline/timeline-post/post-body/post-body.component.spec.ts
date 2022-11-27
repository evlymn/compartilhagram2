import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostBodyComponent} from './post-body.component';

describe('PostBodyComponent', () => {
  let component: PostBodyComponent;
  let fixture: ComponentFixture<PostBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostBodyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
