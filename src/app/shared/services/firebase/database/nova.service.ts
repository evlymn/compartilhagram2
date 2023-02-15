import { Injectable } from '@angular/core';
import {RealtimeService} from "./realtime.service";
import {getDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class NovaService extends RealtimeService {
  constructor() {
    const db = getDatabase( undefined,  "https://compartilhagram-com-timeline.firebaseio.com/");
    super(db);
  }
}
