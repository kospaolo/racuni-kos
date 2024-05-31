import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TranslationModule } from './modules/translation/translation.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslationService } from './services/translation.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OfferServicesComponent } from './offer-services/offer-services.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SharedService } from './shared.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AddServiceComponent } from './offer-services/add-service/add-service/add-service.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OfferServicesComponent,
    PageNotFoundComponent,
    AddServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatInputModule,
    FormsModule
  ],
  providers: [TranslationService, provideAnimationsAsync(), SharedService, ToastrService, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translationService: TranslationService) {
    this.translationService.loadDictionary().subscribe((dictionary) => {
      this.translationService.setTranslations(dictionary);
      this.translationService.setDefaultAndCurrentLang('hr');
    });
  }
}
