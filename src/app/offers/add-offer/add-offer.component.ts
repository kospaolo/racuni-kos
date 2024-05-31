import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
  newCustomer: any = { firstName: '', lastName: '' };
  selectedServiceIds: string[] = [];
  services: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.apiService.getServices().subscribe(
      services => {
        this.services = services;
      },
      error => {
        console.error('Error fetching services', error);
      }
    );
  }

  createOffer(): void {
    this.apiService.addCustomer(this.newCustomer).subscribe(
      customer => {
        const newOffer = {
          customerId: customer.id,
          serviceIds: this.selectedServiceIds,
          created: new Date()
        };
        this.apiService.addOffer(newOffer).subscribe(
          offer => {
            this.toastr.success('Offer created!');
            this.activeModal.close('added');
          },
          error => {
            this.toastr.error('Error creating offer');
            console.error('Error creating offer:', error);
          }
        );
      },
      error => {
        this.toastr.error('Error creating customer');
        console.error('Error creating customer:', error);
      }
    );
  }
}