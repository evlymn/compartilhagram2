import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesRoomsComponent} from './messages-rooms.component';

describe('MessagesRoomsComponent', () => {
  let component: MessagesRoomsComponent;
  let fixture: ComponentFixture<MessagesRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesRoomsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MessagesRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
