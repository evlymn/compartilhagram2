import {Injectable} from '@angular/core';
import {LanguageService} from "../../services/language/language.service";

@Injectable({
  providedIn: 'root'
})
export class EditableTextAreaService {

  componentExists = false;


  constructor(private _languageService: LanguageService) {

  }


  emojiPickerTranslation() {
    return  {
      search: this._languageService.getText('pesquisar'),
      emojilist: 'List of emoji',
      notfound: 'No Emoji Found',
      clear: 'Clear',
      categories:
        {
          search: this._languageService.getText('resultadopesquisa'),
          recent: this._languageService.getText('recentes'),
          people: 'Smileys & People',
          nature: 'Animals & Nature',
          foods: 'Food & Drink',
          activity: 'Activity',
          places: 'Travel & Places',
          objects: 'Objects',
          symbols: 'Symbols',
          flags: 'Flags',
          custom: 'Custom',
        },
      skintones: {
        1: 'Default Skin Tone',
        2: 'Light Skin Tone',
        3: 'Medium-Light Skin Tone',
        4: 'Medium Skin Tone',
        5: 'Medium-Dark Skin Tone',
        6: 'Dark Skin Tone',
      },
    };
  }
}
