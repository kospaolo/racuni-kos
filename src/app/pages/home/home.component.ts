import {Component, DestroyRef, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';
import { Customer } from '../../models/customer.model';
import { Offer } from '../../models/offer.model';
import { Invoice } from '../../models/invoice.model';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [DatePipe, TranslateModule]
})
export class HomeComponent implements OnInit {
  #apiService: ApiService = inject(ApiService);
  #destroyRef: DestroyRef = inject(DestroyRef);

  services: WritableSignal<Service[]>   = signal<Service[]>([]);
  customers: WritableSignal<Customer[]> = signal<Customer[]>([]);
  offers: WritableSignal<Offer[]>       = signal<Offer[]>([]);
  invoices: WritableSignal<Invoice[]>   = signal<Invoice[]>([]);

  ngOnInit(): void {
    this.fetchServices();
    this.fetchCustomers();
    this.fetchOffers();
    this.fetchInvoices();
  }

  fetchServices(): void {
    const subscription = this.#apiService.fetchServices().subscribe({
        next: (response) => {
          this.services.set(response);
        },
        error: (error) => {
          console.error('Error fetching services', error);
        }
    });

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  fetchCustomers(): void {
    const subscription = this.#apiService.fetchCustomers().subscribe({
      next: (response) => {
        this.customers.set(response);
      },
      error: (error) => {
        console.error('Error fetching customers', error);
      }
    });

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  fetchOffers(): void {
    const subscription = this.#apiService.fetchOffers().subscribe({
      next: (response) => {
        this.offers.set(response);
      },
      error: (error) => {
        console.error('Error fetching offers', error);
      }
    });

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  fetchInvoices(): void {
    const subscription = this.#apiService.fetchInvoices().subscribe({
      next: (response) => {
        this.invoices.set(response);
      },
      error: (error) => {
        console.error('Error fetching invoices', error);
      }
    });

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
