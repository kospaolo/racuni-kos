import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { Service } from 'src/app/models/service.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-service',
    templateUrl: './edit-service.component.html',
    styleUrl: './edit-service.component.scss',
    standalone: true,
    imports: [FormsModule, TranslateModule]
})
export class EditServiceComponent {

  service: Service = {
    name: '',
    description: '',
    price: 0,
    code: 0
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
    this.apiService.editService(this.service_id, this.service).subscribe(res => {
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
