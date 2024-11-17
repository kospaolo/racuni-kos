import {Component, DestroyRef, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { Service } from '../models/service.model';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';
import { PdfService } from '../services/pdf.service';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatPaginator,
        DatePipe,
        TranslateModule,
    ],
})
export class OffersComponent implements OnInit {
  #modalService: NgbModal = inject(NgbModal);
  #toast: ToastrService   = inject(ToastrService);
  #apiService: ApiService = inject(ApiService);
  #pdfService: PdfService = inject(PdfService);
  #destroyRef: DestroyRef = inject(DestroyRef);

  services: WritableSignal<Service[]>   = signal<Service[]>([]);
  offers: WritableSignal<Offer[]>       = signal<Offer[]>([]);
  customers: WritableSignal<Customer[]> = signal<Customer[]>([]);

  columns: string[] = ['number', 'customer', 'service', 'created', 'action'];

  ngOnInit() {
    this.fetchOffers();
    this.fetchCustomers();
    this.fetchServices();
  }

  fetchServices() {
    const subscription = this.#apiService.fetchServices().subscribe({
      next: (response) => {
        this.services.set(response);
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  fetchOffers() {
    const subscription = this.#apiService.fetchOffers().subscribe({
      next: (response) => {
        this.offers.set(response);
      },
      error: (error) => {
        console.error('Error fetching offers', error);
      }
    });

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  fetchCustomers() {
    const subscription = this.#apiService.fetchCustomers().subscribe({
      next: (response) => {
        this.customers.set(response);
      },
      error: (error) => {
        console.error('Error fetching customers', error);
      }
    });

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  getCustomerName(customerId: any): string {
    const customer = this.customers().find((c) => c.id === customerId);
    return customer ? `${customer.firstname} ${customer.lastname}` : 'Unknown';
  }

  getServiceNames(serv: any[]): string {
    if (!serv || !Array.isArray(serv)) {
      return '';
    }
    return serv
      .map((s) => {
        const service = this.services().find((service) => service.id === s.serviceId);
        return service ? service.name : '';
      })
      .filter((name) => name)
      .join(', ');
  }

  addOffer() {
    const modalRef = this.#modalService.open(AddOfferComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.#toast.success('Offer added!');
          this.fetchOffers();
        }
      },
      (reason) => {}
    );
  }

  editOffer(offer_id: string) {
    const modalRef = this.#modalService.open(EditOfferComponent);
    modalRef.componentInstance.offer_id = offer_id;
    modalRef.result.then(
      (result) => {
        if (result === 'added') {
          this.#toast.success('Offer added!');
          this.fetchOffers();
        }
      },
      (reason) => {}
    );
  }

  deleteOffer(offerId: string) {
    this.#apiService.deleteOffer(offerId).subscribe(
      () => {
        this.#toast.success('Offer deleted!');
        this.fetchOffers();
      },
      (error) => {
        console.error('Error deleting offer', error);
        this.#toast.error('Failed to delete offer');
      }
    );
  }

  downloadOfferPdf(offerId: string) {
    const offer = this.offers().find((o) => o.id === offerId);

    if (!offer) {
      this.#toast.error('Offer not found');
      return;
    }

    const customer = this.customers().find((c) => c.id === offer.customerId);
    if (!customer) {
      this.#toast.error('Customer not found');
      return;
    }

    this.#pdfService.generatePdf(customer, this.services(), offer, undefined);
    this.#toast.success('Offer downloaded!');
  }
}
