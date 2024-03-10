import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';

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
    private sharedService: SharedService,
    private toastr: ToastrService
  ) {}

  addService() {
    this.sharedService.addService(this.newService).then(
      (response) => {
        this.modal.close('added');
      },
      (error) => {
        console.error('Error adding service:', error);
      }
    );
  }
}
