import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { Service } from '../models/service.model';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';
import { PdfService } from '../services/pdf.service';
import { EditOfferComponent } from './edit-offer/edit-offer.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  columns: string[] = ['number', 'customer', 'service', 'created', 'action'];
  services: Service[] = [];
  offers: Offer[] = [];
  customers: Customer[] = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private apiService: ApiService,
    private pdfService: PdfService
  ) {}

  ngOnInit() {
    this.fetchOffers();
    this.fetchCustomers();
    this.fetchServices();
  }

  fetchServices() {
    this.apiService.fetchServices().subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  fetchOffers() {
    this.apiService.fetchOffers().subscribe(
      (offers) => {
        this.offers = offers;
      },
      (error) => {
        console.error('Error fetching offers', error);
      }
    );
  }

  fetchCustomers() {
    this.apiService.fetchCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        console.error('Error fetching customers', error);
      }
    );
  }

  getCustomerName(customerId: any): string {
    const customer = this.customers.find((c) => c.id === customerId);
    return customer ? `${customer.firstname} ${customer.lastname}` : 'Unknown';
  }

  getServiceNames(serviceIds: any[]): string {
    return this.services
      .filter((service) => serviceIds.includes(service.id))
      .map((service) => service.name)
      .join(', ');
  }

  addOffer() {
    const modalRef = this.modalService.open(AddOfferComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Offer added!');
          this.fetchOffers();
        }
      },
      (reason) => {}
    );
  }

  editOffer(offer_id: string) {
    const modalRef = this.modalService.open(EditOfferComponent);
    modalRef.componentInstance.offer_id = offer_id;
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Offer added!');
          this.fetchOffers();
        }
      },
      (reason) => {}
    );
  }

  deleteOffer(offerId: string) {
    this.apiService.deleteOffer(offerId).subscribe(
      () => {
        this.toastr.success('Offer deleted!');
        this.fetchOffers();
      },
      (error) => {
        console.error('Error deleting offer', error);
        this.toastr.error('Failed to delete offer');
      }
    );
  }

  downloadOfferPdf(offerId: string) {
    const offer = this.offers.find((o) => o.id === offerId);

    if (!offer) {
      this.toastr.error('Offer not found');
      return;
    }

    const customer = this.customers.find((c) => c.id === offer.customerId);
    if (!customer) {
      this.toastr.error('Customer not found');
      return;
    }

    this.pdfService.generatePdf(customer, this.services, offer);
    this.toastr.success('Offer created!');
  }
}
