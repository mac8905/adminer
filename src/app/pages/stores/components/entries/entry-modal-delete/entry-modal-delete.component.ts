import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { EntriesService } from '../../../../../services/entries.service';

@Component({
  selector: 'nga-app-entry-modal-delete',
  templateUrl: './entry-modal-delete.component.html',
  styleUrls: ['./entry-modal-delete.component.scss']
})
export class EntryModalDeleteComponent implements OnInit {
  modalHeader: string;
  formEntry: FormGroup;
  source: LocalDataSource;
  data: any;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private entriesService: EntriesService,
  ) { }

  ngOnInit() {
    this.formEntry = this.fb.group({});
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.entriesService.delete(this.data)
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
