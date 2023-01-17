import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatRoomsComponent} from './chat-rooms.component';

describe('MessagesRoomsComponent', () => {
  let component: ChatRoomsComponent;
  let fixture: ComponentFixture<ChatRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatRoomsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
