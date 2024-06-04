import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
  newCustomer: any = { firstname: '', lastname: '' };
  selectedServiceIds: string[] = [];
  services: any[] = [];
  number: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadServices();
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

  createInvoice(): void {
    this.apiService.addCustomer(this.newCustomer).subscribe(
      customer => {
        const newInvoice = {
          customerId: customer.id,
          serviceIds: this.selectedServiceIds,
          created: new Date(),
          number: this.number
        };
        this.apiService.addInvoice(newInvoice).subscribe(
          invoice => {
            this.toastr.success('Invoice created!');
            this.activeModal.close('added');
          },
          error => {
            this.toastr.error('Error creating offer');
            console.error('Error creating offer:', error);
          }
        );
      },
      error => {
        this.toastr.error('Error creating customer');
        console.error('Error creating customer:', error);
      }
    );
  }
}