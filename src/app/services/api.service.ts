import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';

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

  editService(serviceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/edit-service/${serviceId}`);
  }

  deleteService(serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-service/${serviceId}`);
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/get-offers`);
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

  editOffer(offerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/edit-offer/${offerId}`);
  }

  deleteOffer(offerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-offer/${offerId}`);
  }

  getCustomer(customer_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-customer/${customer_id}`);
  }

  editCustomer(customer_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/edit-customer/${customer_id}`);
  }

  deleteCustomer(customer_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-customer/${customer_id}`);
  }
}