import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { ProvidersService } from '../../../../../services/providers.service';

@Component({
  selector: 'nga-app-provider-modal-delete',
  templateUrl: './provider-modal-delete.component.html',
  styleUrls: ['./provider-modal-delete.component.scss']
})
export class ProviderModalDeleteComponent implements OnInit {
  modalHeader: string;
  formProvider: FormGroup;
  source: LocalDataSource;
  data: any;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private providersService: ProvidersService,
  ) { }

  ngOnInit() {
    this.formProvider = this.fb.group({});
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.providersService.delete(this.data)
        .subscribe(res => {
          if (res.success) {
            this.source.remove(this.data);
            this.source.refresh();
            this.activeModal.close();
            this._notificationsService.success('Transacción exitósa', res.message);
          } else {
            this._notificationsService.error('Transacción fallida', res.message);
          }
        }, error => {
          this._notificationsService.error('Transacción fallida', error);
        });

      this.source.remove(this.data);
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible eliminar el registro. Por favor intenta nuevamente.'
      );
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
