import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private translationService: TranslationService) {}

  switchLanguage(language: string) {
    this.translationService.setDefaultAndCurrentLang(language);
  }
}
