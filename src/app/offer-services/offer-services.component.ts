import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AddServiceComponent } from './add-service/add-service/add-service.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offer-services',
  templateUrl: './offer-services.component.html',
  styleUrl: './offer-services.component.scss',
})
export class OfferServicesComponent {
  constructor(
    private sharedService: SharedService,
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  columns: string[] = ['name', 'description', 'price', 'action'];
  services: any = [];

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.sharedService.getServices().subscribe((res) => {
      this.services = res;
    });
  }

  addService() {
    const modalRef = this.modalService.open(AddServiceComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Service added!');
          this.getServices();
        } else {
          console.error('Service not deleted!');
        }
      },
      (reason) => {}
    );
  }

  deleteService(service_id: string) {
    this.sharedService.deleteService(service_id).then(
      (response) => {
        this.toastr.success('Service deleted!');
      },
      (error) => {
        this.toastr.error('Service not deleted!');
        console.error('Error deleting service:', error);
      }
    );
  }
}
