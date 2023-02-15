import {Injectable} from '@angular/core';
import {getDatabase} from "@angular/fire/database";
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService extends RealtimeService {
  constructor() {
    const db = getDatabase();

    // const db = getDatabase( undefined,  "https://compartilhagram-com-users.firebaseio.com/");
    super(db);
  }
}
