import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  translations: any = {}; // Object to store translations

  constructor(private http: HttpClient, private translate: TranslateService) {}

  loadDictionary(): Observable<any> {
    return this.http.get<any>('assets/i18n/dictionary.json');
  }

  setTranslations(dictionary: any) {
    this.translations = dictionary;
    this.translate.setTranslation('en', this.flattenTranslations('en'));
    this.translate.setTranslation('hr', this.flattenTranslations('hr'));
  }

  private flattenTranslations(lang: string): any {
    const flattenedTranslations: { [key: string]: string } = {};
    Object.keys(this.translations).forEach(key => {
      flattenedTranslations[key] = this.translations[key][lang];
    });
    return flattenedTranslations;
  }

  setDefaultAndCurrentLang(lang: string) {
    this.translate.setDefaultLang(lang);
  }
}
