import { Component } from '@angular/core';
import { AddServiceComponent } from './add-service/add-service/add-service.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Service } from '../models/service.model';
import { EditServiceComponent } from './edit-service/add-service/edit-service.component';

@Component({
  selector: 'app-offer-services',
  templateUrl: './offer-services.component.html',
  styleUrl: './offer-services.component.scss',
})

export class OfferServicesComponent {
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  columns: string[] = ['code', 'name', 'description', 'price', 'action'];
  services: Service[] = [];

  ngOnInit() {
    this.fetchServices();
  }

  fetchServices() {
    this.apiService.fetchServices().subscribe(services => {
      this.services = services;
    }, error => {
      console.error('Error fetching data', error);
    });
  }

  addService() {
    const modalRef = this.modalService.open(AddServiceComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Service added!');
          this.fetchServices();
        } else {
          console.error('Service not deleted!');
        }
      },
      (reason) => {}
    );
  }

  editService(service_id: string) {
    const modalRef = this.modalService.open(EditServiceComponent);
    modalRef.componentInstance.service_id = service_id;
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.toastr.success('Service edited!');
          this.fetchServices();
        } else {
          console.error('Service not edited!');
        }
      },
      (reason) => {}
    );
  }

  deleteService(service_id: string) {
    this.apiService.deleteService(service_id).subscribe(
      (response) => {
        this.toastr.success('Service deleted!');
        this.services = this.services.filter((item) => item.id !== service_id);
      },
      (error) => {
        this.toastr.error('Service not deleted!');
        console.error('Error deleting service:', error);
      }
    );
  }
}
