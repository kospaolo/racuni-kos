import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferServicesComponent } from './pages/offer-services/offer-services.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { OffersComponent } from './pages/offers/offers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InvoicesComponent } from './pages/invoices/invoice.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services', component: OfferServicesComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
