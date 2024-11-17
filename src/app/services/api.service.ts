import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { Service } from '../models/service.model';
import {environment} from "../environments/environment";
import {ApiRoutes} from "../enums/api-routes.enum";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #http: HttpClient = inject(HttpClient);

  fetchServices(): Observable<any> {
    return this.#http.get(`${environment.baseUrl}${ApiRoutes.apiRoute}/fetch-services`);
  }

  getService(serviceId: string): Observable<any> {
    return this.#http.get(`${environment.baseUrl}${ApiRoutes.apiRoute}/get-service/${serviceId}`);
  }

  addService(data: any): Observable<any> {
    return this.#http.post(`${environment.baseUrl}${ApiRoutes.apiRoute}/add-service`, data);
  }

  editService(serviceId: string, service: Service): Observable<any> {
    return this.#http.put(`${environment.baseUrl}${ApiRoutes.apiRoute}/edit-service/${serviceId}`, service);
  }

  deleteService(serviceId: string): Observable<any> {
    return this.#http.delete(`${environment.baseUrl}${ApiRoutes.apiRoute}/delete-service/${serviceId}`);
  }

  fetchOffers(): Observable<Offer[]> {
    return this.#http.get<Offer[]>(`${environment.baseUrl}${ApiRoutes.apiRoute}/fetch-offers`);
  }

  addOffer(offer: Offer): Observable<Offer> {
    return this.#http.post<Offer>(`${environment.baseUrl}${ApiRoutes.apiRoute}/add-offer`, offer);
  }

  fetchCustomers(): Observable<Customer[]> {
    return this.#http.get<Customer[]>(`${environment.baseUrl}${ApiRoutes.apiRoute}/fetch-customers`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.#http.post<Customer>(`${environment.baseUrl}${ApiRoutes.apiRoute}/add-customer`, customer);
  }

  editOffer(offerId: string, offer: Offer): Observable<any> {
    return this.#http.put(`${environment.baseUrl}${ApiRoutes.apiRoute}/edit-offer/${offerId}`, offer);
  }

  deleteOffer(offerId: string): Observable<any> {
    return this.#http.delete(`${environment.baseUrl}${ApiRoutes.apiRoute}/delete-offer/${offerId}`);
  }

  getCustomer(customer_id: string): Observable<any> {
    return this.#http.get(`${environment.baseUrl}${ApiRoutes.apiRoute}/get-customer/${customer_id}`);
  }

  editCustomer(customer_id: string, customer: Customer): Observable<any> {
    return this.#http.put(`${environment.baseUrl}${ApiRoutes.apiRoute}/edit-customer/${customer_id}`, customer);
  }

  deleteCustomer(customer_id: string): Observable<any> {
    return this.#http.delete(`${environment.baseUrl}${ApiRoutes.apiRoute}/delete-customer/${customer_id}`);
  }

  fetchInvoices(): Observable<Invoice[]> {
    return this.#http.get<Invoice[]>(`${environment.baseUrl}${ApiRoutes.apiRoute}/fetch-invoices`);
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.#http.post<Invoice>(`${environment.baseUrl}${ApiRoutes.apiRoute}/add-invoice`, invoice);
  }

  editInvoice(offerId: string, invoice: Invoice): Observable<any> {
    return this.#http.put(`${environment.baseUrl}${ApiRoutes.apiRoute}/edit-invoice/${offerId}`, invoice);
  }

  deleteInvoice(invoice_id: string): Observable<any> {
    return this.#http.delete(`${environment.baseUrl}${ApiRoutes.apiRoute}/delete-invoice/${invoice_id}`);
  }
}
