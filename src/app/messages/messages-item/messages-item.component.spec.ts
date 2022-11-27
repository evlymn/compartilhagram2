import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesItemComponent} from './messages-item.component';

describe('MessagesItemComponent', () => {
  let component: MessagesItemComponent;
  let fixture: ComponentFixture<MessagesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MessagesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
