import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
  selectedCustomerId: string = '';
  selectedServiceIds: { [key: string]: boolean } = {};
  serviceQuantities: { [key: string]: number } = {};
  services: any[] = [];
  customers: any[] = [];
  number: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadCustomers();
  }

  loadServices(): void {
    this.apiService.fetchServices().subscribe(
      services => {
        this.services = services;
      },
      error => {
        console.error('Error fetching services', error);
      }
    );
  }

  loadCustomers(): void {
    this.apiService.fetchCustomers().subscribe(
      customers => {
        this.customers = customers;
      },
      error => {
        console.error('Error fetching customers', error);
      }
    );
  }

  createInvoice(): void {
    const selectedCustomer = this.customers.find(customer => customer.id === this.selectedCustomerId);
    
    if (!selectedCustomer) {
      this.toastr.error('Please select a valid customer');
      return;
    }

    const selectedServicesWithQuantities = Object.keys(this.selectedServiceIds)
      .filter(id => this.selectedServiceIds[id])
      .map(id => ({
        serviceId: id,
        quantity: this.serviceQuantities[id] || 1
      }));

    const newInvoice = {
      customerId: selectedCustomer.id,
      services: selectedServicesWithQuantities,
      created: new Date(),
      number: this.number
    };

    this.apiService.addInvoice(newInvoice).subscribe(
      invoice => {
        this.toastr.success('Invoice created!');
        this.activeModal.close('added');
      },
      error => {
        this.toastr.error('Error creating invoice');
        console.error('Error creating invoice:', error);
      }
    );
  }
}