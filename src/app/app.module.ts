import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TranslationModule } from './modules/translation/translation.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslationService } from './services/translation.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    TranslationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translationService: TranslationService) {
    this.translationService.loadDictionary().subscribe(dictionary => {
      this.translationService.setTranslations(dictionary);
      this.translationService.setDefaultAndCurrentLang('hr');
    });
  }
}
