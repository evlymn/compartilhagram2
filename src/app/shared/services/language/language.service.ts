import {Injectable} from '@angular/core';
import {RealtimeService} from "../firebase/database/realtime.service";


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: any

  constructor(private realtime: RealtimeService) {
    if (!this.language)
      this.createLanguageMap()
  }

  createLanguageMap() {
    this.language = new Map<string, Map<string, string>>();
    this.realtime.get('translate').then(snapshot => {
      snapshot.forEach(w => {
        const word = w.val()
        this.addToLanguageMap(word.key, word.pt, word.en)
      })
    })
  }

  addToLanguageMap(key: string, textPt: string, textEn: string) {
    const mapLng = new Map<string, string>([["pt", textPt], ["en", textEn]])
    this.language.set(key, mapLng);
  }

  getTextByLang(key: string, lng: string) {
    return this.language.get(key)?.get(lng)
  }

  getText(key: string) {
    const lng = window.location.host == 'exchangeagram.app' ? 'en' : 'pt';
    return this.language.get(key)?.get(lng)
  }
}
