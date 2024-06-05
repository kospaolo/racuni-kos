import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { Service } from '../models/service.model';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';
import { PdfService } from '../services/pdf.service';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoicesComponent implements OnInit {
  columns: string[] = ['number', 'customer', 'service', 'created', 'action'];
  services: Service[] = [];
  invoices: Offer[] = [];
  customers: Customer[] = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private apiService: ApiService,
    private pdfService: PdfService
  ) {}

  ngOnInit() {
    this.fetchInvoices();
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

  fetchInvoices() {
    this.apiService.fetchInvoices().subscribe(
      (invoices) => {
        this.invoices = invoices;
      },
      (error) => {
        console.error('Error fetching offers', error);
      }
    );
    this.fetchCustomers();
    this.fetchServices();
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

  getServiceNames(serv: any[]): string {
    if (!serv || !Array.isArray(serv)) {
      return '';
    }
    return serv
      .map((s) => {
        const service = this.services.find((service) => service.id === s.serviceId);
        return service ? service.name : '';
      })
      .filter((name) => name)
      .join(', ');
  }

  addInvoice() {
    const modalRef = this.modalService.open(AddInvoiceComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Invoice added!');
          this.fetchInvoices();
        }
      },
      (reason) => {}
    );
  }

  editInvoice(invoice_id: string) {
    const modalRef = this.modalService.open(EditInvoiceComponent);
    modalRef.componentInstance.invoice_id = invoice_id;
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Invoice eddited!');
          this.fetchInvoices();
        }
      },
      (reason) => {}
    );
  }

  deleteInvoice(invoice_id: string) {
    this.apiService.deleteInvoice(invoice_id).subscribe(
      () => {
        this.toastr.success('Invoice deleted!');
        this.fetchInvoices();
      },
      (error) => {
        console.error('Error deleting invoice', error);
        this.toastr.error('Failed to delete invoice');
      }
    );
  }

  downloadInvoicePdf(invoice_id: string) {
    const invoice = this.invoices.find((o) => o.id === invoice_id);

    if (!invoice) {
      this.toastr.error('Invoice not found');
      return;
    }

    const customer = this.customers.find((c) => c.id === invoice.customerId);
    if (!customer) {
      this.toastr.error('Customer not found');
      return;
    }

    this.pdfService.generatePdf(customer, this.services, undefined, invoice);
    this.toastr.success('Invoice downloaded!');
  }
}
