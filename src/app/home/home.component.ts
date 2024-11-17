import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Service } from '../models/service.model';
import { Customer } from '../models/customer.model';
import { Offer } from '../models/offer.model';
import { Invoice } from '../models/invoice.model';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, DatePipe, TranslateModule]
})
export class HomeComponent implements OnInit {
  services: Service[] = [];
  customers: Customer[] = [];
  offers: Offer[] = [];
  invoices: Invoice[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchServices();
    this.fetchCustomers();
    this.fetchOffers();
    this.fetchInvoices();
  }

  fetchServices(): void {
    this.apiService.fetchServices().subscribe(
      services => {
        this.services = services;
      },
      error => {
        console.error('Error fetching services', error);
      }
    );
  }

  fetchCustomers(): void {
    this.apiService.fetchCustomers().subscribe(
      customers => {
        this.customers = customers;
      },
      error => {
        console.error('Error fetching customers', error);
      }
    );
  }

  fetchOffers(): void {
    this.apiService.fetchOffers().subscribe(
      offers => {
        this.offers = offers;
      },
      error => {
        console.error('Error fetching offers', error);
      }
    );
  }

  fetchInvoices(): void {
    this.apiService.fetchInvoices().subscribe(
      invoices => {
        this.invoices = invoices;
      },
      error => {
        console.error('Error fetching invoices', error);
      }
    );
  }
}