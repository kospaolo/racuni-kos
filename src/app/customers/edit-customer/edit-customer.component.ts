import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent {

  customer: Customer = {
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    zip: 0
  };

  @Input() public customer_id: any;

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getCustomer();
  }

  editCustomer() {
    this.apiService.editCustomer(this.customer_id).subscribe(res => {
      this.modal.close('added');
    }, error => {
      console.error('Error customer edit', error);
    });
  }

  getCustomer() {
    this.apiService.getCustomer(this.customer_id).subscribe(res => {
      this.customer = res;
    }, error => {
      console.error('Error adding service', error);
    });
  }
}
