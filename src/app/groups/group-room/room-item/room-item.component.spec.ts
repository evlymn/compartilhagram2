import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomItemComponent} from './room-item.component';

describe('GroupRoomItemComponent', () => {
  let component: RoomItemComponent;
  let fixture: ComponentFixture<RoomItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
