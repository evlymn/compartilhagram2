import {Injectable} from '@angular/core';
import {
  child, Database, DataSnapshot, get, onChildAdded, onChildChanged, onChildRemoved, onValue, push, query, Query,
  QueryConstraint, ref, remove, set, update
} from "@angular/fire/database";

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private db: Database) {
  }

  createId() {
    return push(child(ref(this.db), 'id')).key;
  }

  add(path: string, data: any) {
    return push(child(ref(this.db), path), data);
  }

  set(path: string, data: any) {
    return set(child(ref(this.db), path), data);
  }

  get(path: string, ...queryConstraints: QueryConstraint[]) {
    return get(query(ref(this.db, path), ...queryConstraints))
  }

  update(path: string, data: any) {
    return update(ref(this.db, path), data);
  }

  delete(path: string) {
    return remove(ref(this.db, path));
  }

  onChildAdded(path: string, callback: (snapshot: DataSnapshot, previousChildName?: string | null) => unknown, ...queryConstraints: QueryConstraint[]) {
    return onChildAdded(query(ref(this.db, path), ...queryConstraints), callback);
  }

  onChildChanged(path: string, callback: (snapshot: DataSnapshot, previousChildName: string | null) => unknown) {
    return onChildChanged(ref(this.db, path), callback);
  }

  onChildRemoved(path: string, callback: (snapshot: DataSnapshot) => unknown) {
    return onChildRemoved(ref(this.db, path), callback);
  }

  onValue(path: string, callback: (snapshot: DataSnapshot) => unknown, ...queryConstraints: QueryConstraint[]) {
    return onValue(query(ref(this.db, path), ...queryConstraints), callback);
  }

  onValueChanges(path: string, idField?: string, ...queryConstraints: QueryConstraint[]) {
    return new Observable<any[]>(subscriber => {
      onValue(query(ref(this.db, path), ...queryConstraints), snapshot => {
        const items = new Array<any>()
        snapshot.forEach(childSnapshot => {
          const newObj = childSnapshot.val()
          if (idField)
            newObj[idField] = childSnapshot.key;
          items.push(newObj);
        })
        subscriber.next(items);
      });
    })
  }

  onChildAddedChanges(path: string, idField?: string, ...queryConstraints: QueryConstraint[]) {
    return new Observable<any>(subscriber => {
      onChildAdded(query(ref(this.db, path), ...queryConstraints), snapshot => {
        console.log(snapshot.val());
        const newObj = snapshot.val()
        if (idField)
          newObj[idField] = snapshot.key;
        subscriber.next([newObj]);
      });
    })
  }
}
