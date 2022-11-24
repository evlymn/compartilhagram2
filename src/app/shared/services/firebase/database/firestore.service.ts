import {Injectable} from '@angular/core';
import {collection, collectionData, Firestore, QueryConstraint} from '@angular/fire/firestore';
import {addDoc, CollectionReference, deleteDoc, doc, getDoc, query, setDoc, updateDoc} from '@firebase/firestore';
import {enableIndexedDbPersistence} from 'firebase/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {
    this.enableIndexedDbPersistence();
  }

  createId() {
    return doc(collection(this.firestore, 'id')).id;
  }

  enableIndexedDbPersistence() {
    enableIndexedDbPersistence(this.firestore)
  }

  list<T>(path: string, ...q: QueryConstraint[]): Observable<T[]> {
    return collectionData<T>(
      query<T>(
        collection(this.firestore, path) as CollectionReference<T>,
        ...q
      ), {idField: 'id'}
    );
  }

  add(path: string, data: any) {
    const ref = collection(this.firestore, path);
    return addDoc(ref, this.setUndefinedValuesToNull(data));
  }

  set(path: string, data: any) {
    const ref = doc(this.firestore, path);
    return setDoc(ref, this.setUndefinedValuesToNull(data));
  }

  get(path: string) {
    const ref = doc(this.firestore, path);
    return getDoc(ref);
  }

  update(path: string, data: any) {
    const ref = doc(this.firestore, path);
    return updateDoc(ref, this.setUndefinedValuesToNull(data));
  }

  delete(path: string) {
    const ref = doc(this.firestore, path);
    return deleteDoc(ref);
  }

  setUndefinedValuesToNull(data: any) {
    Object.keys(data).filter(k => data[k] == undefined).forEach(k => data[k] = null);
    return data;
  }
}
