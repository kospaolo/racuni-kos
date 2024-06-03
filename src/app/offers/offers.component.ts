import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { Service } from '../models/service.model';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  columns: string[] = ['name', 'description', 'price', 'action'];
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
    this.getOffers();
    this.getCustomers();
    this.getServices();
  }

  getServices() {
    this.apiService.getServices().subscribe(services => {
      this.services = services;
    }, error => {
      console.error('Error fetching data', error);
    });
  }

  getOffers() {
    this.apiService.getOffers().subscribe(offers => {
      this.offers = offers;
    }, error => {
      console.error('Error fetching offers', error);
    });
  }

  getCustomers() {
    this.apiService.getCustomers().subscribe(customers => {
      this.customers = customers;
    }, error => {
      console.error('Error fetching customers', error);
    });
  }

  getCustomerName(customerId: any): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
  }

  getServiceNames(serviceIds: any[]): string {
    return this.services
      .filter(service => serviceIds.includes(service.id))
      .map(service => service.name)
      .join(', ');
  }

  openAddOfferModal() {
    const modalRef = this.modalService.open(AddOfferComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Offer added!');
          this.getOffers();
        }
      },
      (reason) => {}
    );
  }

  deleteOffer(offerId: string) {
    this.apiService.deleteOffer(offerId).subscribe(() => {
      this.toastr.success('Offer deleted!');
      this.getOffers();
    }, error => {
      console.error('Error deleting offer', error);
      this.toastr.error('Failed to delete offer');
    });
  }

  downloadOfferPdf(offerId: string) {
    const offer = this.offers.find(o => o.id === offerId);

    if (!offer) {
      this.toastr.error('Offer not found');
      return;
    }

    const customer = this.customers.find(c => c.id === offer.customerId);
    if (!customer) {
      this.toastr.error('Customer not found');
      return;
    }

    this.pdfService.generatePdf(customer, this.services, offer);
    this.toastr.success('Offer created!');
  }
}