import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    standalone: true,
  imports: [RouterLink, TranslateModule, NgOptimizedImage]
})
export class NavbarComponent {
  constructor(private translationService: TranslationService) {}

  switchLanguage(language: string) {
    this.translationService.setDefaultAndCurrentLang(language);
  }
}
