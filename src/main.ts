import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {HttpLoaderFactory, TranslationModule} from './app/modules/translation/translation.module';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ApiService } from './app/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslationService } from './app/services/translation.service';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, TranslationModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }), MatTableModule, MatPaginatorModule, MatButtonModule, MatDialogModule, ToastrModule.forRoot(), MatInputModule, FormsModule, CommonModule),
        TranslationService, provideAnimationsAsync(), ToastrService, NgbActiveModal, ApiService,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
