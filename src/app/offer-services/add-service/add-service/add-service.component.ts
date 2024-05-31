import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent {

  newService = {
    name: '',
    description: '',
    price: '',
  };

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
  ) {}

  addService() {
    this.apiService.addService(this.newService).subscribe(res => {
      this.modal.close('added');
    }, error => {
      console.error('Error adding service', error);
    });
  }
}
