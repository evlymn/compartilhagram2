import {Injectable} from '@angular/core';
import {RealtimeService} from "../firebase/database/realtime.service";
import {AuthenticationService} from "../firebase/authentication/authentication.service";
import {QueryConstraint} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private _realtimeService: RealtimeService,
    private _auth: AuthenticationService) {
  }


  async setFavorite(path: string, data: any) {
    const snapshot = await this._realtimeService.get(path);
    if (!snapshot.exists()) {
      return this.createFavorite(path, data);
    } else {
      return this.removeFavorite(path);
    }
  }

  async createFavorite(path: string, data: any) {
    return this._realtimeService.set(path,
      data
    ).then(() => 'create')
  }

  async removeFavorite(path: string) {
    return this._realtimeService.delete(path).then(() => 'delete')
  }

  async getTotalFavorites(path: string,...queryConstraints: QueryConstraint[]) {
    const total = await this._realtimeService.get(path, ...queryConstraints);
    return total.size;
  }

  getTotalFavoritesOnChanges(path: string,...queryConstraints: QueryConstraint[]) {
    return this._realtimeService.onValueChanges(path,undefined, ...queryConstraints);
  }
}
