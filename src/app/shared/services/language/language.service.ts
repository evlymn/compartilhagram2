import {Injectable} from '@angular/core';
import {RealtimeService} from "../firebase/database/realtime.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languageArr: any[] = [];

  constructor(private realtime: RealtimeService) {
    this.checkLanguageCache();
    this.updateLocalCache();
  }

  checkLanguageCache() {
    this.languageArr = [];
    if (localStorage.getItem('languages')) {
      this.languageArr = JSON.parse(localStorage.getItem('languages')!)
    }
    if (this.languageArr.length == 0) {
      this.getTranslateFromBd().catch();
    }
  }

  updateLocalCache() {
    this.realtime.onValue('translate/config/updateClients', snapshot => {
      if (snapshot.val() == true) {
        this.getTranslateFromBd().then(() => {
          this.realtime.set('translate/config/', {
            updateClients: false
          }).catch();
        })
      }
    })
  }

  async getTranslateFromBd() {
    const newArr: any[] = [];
    const snapshot = await this.realtime.get('translate/list');
    snapshot.forEach(w => {
      newArr.push(w.val());
    })
    this.languageArr = newArr;
    localStorage.setItem('languages', JSON.stringify(this.languageArr));
  }

  getTextByLang(key: string, lng: string) {
    const filtered = this.languageArr.filter((d: { key: string; }) => d.key == key)
    if (filtered.length > 0)
      return filtered[0][lng]
    else
      return key;
  }

  getText(key: string) {
    const lng = window.location.host.includes('exchangeagram.app') ? 'en' : 'pt';
    const filtered = this.languageArr.filter((d: { key: string; }) => d.key == key)
    if (filtered.length > 0)
      return filtered[0][lng]
    else
      return key;
  }
}
