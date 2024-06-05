import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  fetchServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetch-services`);
  }

  getService(serviceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-service/${serviceId}`);
  }
  
  addService(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-service`, data);
  }

  editService(serviceId: string, service: Service): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit-service/${serviceId}`, service);
  }

  deleteService(serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-service/${serviceId}`);
  }

  fetchOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/fetch-offers`);
  }

  addOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/add-offer`, offer);
  }

  fetchCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/fetch-customers`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/add-customer`, customer);
  }

  editOffer(offerId: string, offer: Offer): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit-offer/${offerId}`, offer);
  }

  deleteOffer(offerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-offer/${offerId}`);
  }

  getCustomer(customer_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-customer/${customer_id}`);
  }

  editCustomer(customer_id: string, customer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit-customer/${customer_id}`, customer);
  }

  deleteCustomer(customer_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-customer/${customer_id}`);
  }

  fetchInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/fetch-invoices`);
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/add-invoice`, invoice);
  }

  editInvoice(offerId: string, invoice: Invoice): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit-invoice/${offerId}`, invoice);
  }

  deleteInvoice(invoice_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-invoice/${invoice_id}`);
  }

  searchCustomers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/search-customers?q=${query}`);
  }
}