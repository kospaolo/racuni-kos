import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { AddServiceComponent } from './add-service/add-service/add-service.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

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
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  columns: string[] = ['name', 'description', 'price', 'action'];
  services: any = [];

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.apiService.getServices().subscribe(services => {
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
          this.getServices();
        } else {
          console.error('Service not deleted!');
        }
      },
      (reason) => {}
    );
  }

  deleteService(service_id: string) {
    this.apiService.deleteService(service_id).subscribe(
      (response) => {
        this.toastr.success('Service deleted!');
        this.services = this.services.filter((item: { id: string; }) => item.id !== service_id);
      },
      (error) => {
        this.toastr.error('Service not deleted!');
        console.error('Error deleting service:', error);
      }
    );
  }
}
