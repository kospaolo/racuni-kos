import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { Customer } from 'src/app/models/customer.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrl: './edit-customer.component.scss',
    standalone: true,
    imports: [FormsModule, TranslateModule]
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
    this.apiService.editCustomer(this.customer_id, this.customer).subscribe(res => {
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
