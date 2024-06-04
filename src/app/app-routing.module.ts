import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferServicesComponent } from './offer-services/offer-services.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OffersComponent } from './offers/offers.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services', component: OfferServicesComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
