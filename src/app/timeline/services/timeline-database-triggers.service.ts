import {Injectable} from '@angular/core';
import {DataSnapshot, QueryConstraint} from "@angular/fire/database";
import {TimelineDatabaseService} from "./timeline-database.service";

@Injectable({
  providedIn: 'root'
})
export class TimelineDatabaseTriggersService {
  constructor(
    private _database: TimelineDatabaseService,) {
  }

  getMessageChildOnRemoved(callback: (snapshot: DataSnapshot) => unknown) {
    return this._database.onChildRemoved('timeline/messages/', callback,)
  }

  getMessagesOnChildAdded(callback: (snapshot: DataSnapshot, previousChildName?: string | null) => unknown, ...queryConstraints: QueryConstraint[]) {
    return this._database.onChildAdded('timeline/messages/', callback, ...queryConstraints,);
  }

  getMessageOnChildChanged(callback: (snapshot: DataSnapshot) => unknown,) {
    return this._database.onChildChanged('timeline/messages/', callback,)
  }

  getMessagesOnValue(callback: (snapshot: DataSnapshot) => unknown, ...queryConstraints: QueryConstraint[]) {
    return this._database.onValue('timeline/messages/', callback, ...queryConstraints)
  }
}
