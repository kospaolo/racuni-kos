import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.scss'
})
export class EditServiceComponent {

  service: Service = {
    name: '',
    description: '',
    price: 0,
    code: 1
  };

  @Input() public service_id: any;

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getService();
  }

  editService() {
    this.apiService.editService(this.service_id).subscribe(res => {
      this.modal.close('added');
    }, error => {
      console.error('Error adding service', error);
    });
  }

  getService() {
    this.apiService.getService(this.service_id).subscribe(res => {
      this.service = res;
    }, error => {
      console.error('Error adding service', error);
    });
  }
}
