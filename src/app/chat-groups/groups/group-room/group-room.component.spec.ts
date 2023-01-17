import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupRoomComponent} from './group-room.component';

describe('GroupRoomComponent', () => {
  let component: GroupRoomComponent;
  let fixture: ComponentFixture<GroupRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRoomComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
