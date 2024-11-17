import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import {TranslationService} from "./services/translation.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet],
})
export class AppComponent {
  constructor(private translationService: TranslationService) {
    this.translationService.loadDictionary().subscribe((dictionary) => {
      this.translationService.setTranslations(dictionary);
      this.translationService.setDefaultAndCurrentLang('hr');
    });
  }
}
