import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupRoomItemComponent} from './group-room-item.component';

describe('GroupRoomItemComponent', () => {
  let component: GroupRoomItemComponent;
  let fixture: ComponentFixture<GroupRoomItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRoomItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupRoomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
