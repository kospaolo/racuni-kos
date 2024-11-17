import { Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, TranslateModule]
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
          this.toastr.success('Customer added!');
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
          this.toastr.success('Customer edited!');
          this.fetchCustomers();
        } else {
          console.error('Customer not edited!');
        }
      },
      (reason) => {}
    );
  }

  deleteCustomer(customer_id: string) {
    this.apiService.deleteCustomer(customer_id).subscribe(
      (response) => {
        this.toastr.success('Customer deleted!');
        this.customers = this.customers.filter((item) => item.id !== customer_id);
      },
      (error) => {
        this.toastr.error('Customer not deleted!');
        console.error('Error deleting customer:', error);
      }
    );
  }
}
