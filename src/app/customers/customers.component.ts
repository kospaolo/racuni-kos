import { Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  columns: string[] = ['firstname', 'lastname', 'email', 'mobilephone', 'address', 'city', 'zip', 'action'];
  customers: Customer[] = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.apiService.fetchCustomers().subscribe(customers => {
      this.customers = customers;
    }, error => {
      console.error('Error fetching data', error);
    });
  }

  addCustomer() {
    const modalRef = this.modalService.open(AddCustomerComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Offer added!');
          this.fetchCustomers();
        }
      },
      (reason) => {}
    );
  }

  editCustomer(customer_id: string) {
    const modalRef = this.modalService.open(EditCustomerComponent);
    modalRef.componentInstance.customer_id = customer_id;
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Service added!');
          this.fetchCustomers();
        } else {
          console.error('Service not deleted!');
        }
      },
      (reason) => {}
    );
  }

  deleteCustomer(customer_id: string) {
    this.apiService.deleteCustomer(customer_id).subscribe(
      (response) => {
        this.toastr.success('Service deleted!');
        this.customers = this.customers.filter((item) => item.id !== customer_id);
      },
      (error) => {
        this.toastr.error('Service not deleted!');
        console.error('Error deleting service:', error);
      }
    );
  }
}
