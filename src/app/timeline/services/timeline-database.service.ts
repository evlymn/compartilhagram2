import {Injectable} from '@angular/core';
import {RealtimeService} from "../../shared/services/firebase/database/realtime.service";
import {getDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class TimelineDatabaseService extends RealtimeService {
  constructor() {
    const db = getDatabase();
    // const db = getDatabase(undefined, "https://compartilhagram-com-timeline.firebaseio.com/");
    super(db);
  }
}
