import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { Service } from 'src/app/models/service.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-service',
    templateUrl: './add-service.component.html',
    styleUrl: './add-service.component.scss',
    standalone: true,
    imports: [FormsModule, TranslateModule]
})
export class AddServiceComponent {

  newService: Service = {
    name: '',
    description: '',
    price: 0,
    code: 0
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
