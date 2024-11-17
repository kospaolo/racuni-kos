import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { Customer } from 'src/app/models/customer.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrl: './add-customer.component.scss',
    standalone: true,
    imports: [FormsModule, TranslateModule]
})
export class AddCustomerComponent {

  newCustomer: Customer = {
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    zip: 0
  };

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
  ) {}

  addCustomer() {
    this.apiService.addCustomer(this.newCustomer).subscribe({
      next: () => {
        this.modal.close('added');
      },
      error: (error) => {
        console.error('Error adding customer', error);
      }
    });
  }
}
